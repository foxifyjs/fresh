import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";

/**
 * RegExp to check for no-cache token in Cache-Control.
 * @private
 */
const CACHE_CONTROL_NO_CACHE_REGEXP = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;

/**
 * Check freshness of the response using request and response headers.
 */
export default function fresh(
  reqHeaders: IncomingHttpHeaders,
  resHeaders: OutgoingHttpHeaders,
) {
  // fields
  const modifiedSince = reqHeaders["if-modified-since"];
  const noneMatch = reqHeaders["if-none-match"];

  // unconditional request
  if (!modifiedSince && !noneMatch) return false;

  // Always return stale when Cache-Control: no-cache
  // to support end-to-end reload requests
  // https://tools.ietf.org/html/rfc2616#section-14.9.4
  const cacheControl = reqHeaders["cache-control"];
  if (cacheControl && CACHE_CONTROL_NO_CACHE_REGEXP.test(cacheControl)) {
    return false;
  }

  // if-none-match
  if (noneMatch && noneMatch !== "*") {
    const etag = resHeaders.etag;

    if (!etag) return false;

    const matches = parseTokenList(noneMatch);
    let etagStale = true;

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];

      if (match === etag || match === `W/${etag}` || `W/${match}` === etag) {
        etagStale = false;
        break;
      }
    }

    if (etagStale) return false;
  }

  // if-modified-since
  if (modifiedSince) {
    const lastModified = resHeaders["last-modified"] as string;
    const modifiedStale =
      !lastModified ||
      !(parseHttpDate(lastModified) <= parseHttpDate(modifiedSince));

    if (modifiedStale) return false;
  }

  return true;
}

/**
 * Parse an HTTP Date into a number.
 *
 * @private
 */
function parseHttpDate(date: string) {
  const timestamp = date && Date.parse(date);

  // istanbul ignore next: guard against date.js Date.parse patching
  return typeof timestamp === "number" ? timestamp : NaN;
}

/**
 * Parse a HTTP token list.
 *
 * @private
 */
function parseTokenList(str: string) {
  const list = [];
  let start = 0;
  let end = 0;

  // gather tokens
  for (let i = 0, len = str.length; i < len; i++) {
    switch (str.charCodeAt(i)) {
      case 0x20 /*   */:
        if (start === end) start = end = i + 1;
        break;
      case 0x2c /* , */:
        list.push(str.substring(start, end));
        start = end = i + 1;
        break;
      default:
        end = i + 1;
        break;
    }
  }

  // final token
  list.push(str.substring(start, end));

  return list;
}

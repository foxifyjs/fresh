const { Suite } = require("benchmark");
const fresh = require("fresh");
const foxifyFresh = require("..").default;

new Suite()
  .add("fresh", () => {
    fresh({ "if-none-match": "*" }, { etag: '"foo"' });
  })
  .add("@foxify/fresh", () => {
    foxifyFresh({ "if-none-match": "*" }, { etag: '"foo"' });
  })
  .on("cycle", e => {
    console.log(e.target.toString());
  })
  .on("complete", function onComplete() {
    console.log("Fastest is %s", this.filter("fastest").map("name"));
  })
  .run({ async: true });

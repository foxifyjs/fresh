# Benchmarks

```bash
Starting benchmark etag-star.js

fresh x 53,595,522 ops/sec ±4.42% (75 runs sampled)
@foxify/fresh x 55,724,648 ops/sec ±3.06% (79 runs sampled)
Fastest is [ '@foxify/fresh', 'fresh' ]

Starting benchmark modified.js

fresh x 1,041,741 ops/sec ±0.33% (89 runs sampled)
@foxify/fresh x 1,047,551 ops/sec ±0.39% (89 runs sampled)
Fastest is [ '@foxify/fresh' ]

Starting benchmark not-modified.js

fresh x 1,052,625 ops/sec ±0.51% (88 runs sampled)
@foxify/fresh x 1,056,041 ops/sec ±0.49% (85 runs sampled)
Fastest is [ '@foxify/fresh', 'fresh' ]

Starting benchmark etag-several.js

fresh x 2,249,868 ops/sec ±0.53% (91 runs sampled)
@foxify/fresh x 11,865,910 ops/sec ±0.78% (89 runs sampled)
Fastest is [ '@foxify/fresh' ]

Starting benchmark etag-single.js

fresh x 10,664,890 ops/sec ±0.84% (87 runs sampled)
@foxify/fresh x 18,773,095 ops/sec ±1.08% (85 runs sampled)
Fastest is [ '@foxify/fresh' ]
```

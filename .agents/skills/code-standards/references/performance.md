# Performance

## Order of operations

1. Make it correct.
2. Make it clear.
3. Measure.
4. Optimize only what the measurement identified.

Optimizing without a measurement is guessing, and guessed optimizations cost
readability permanently in exchange for nothing.

## What is worth doing without measuring

These are not premature — they are just correct defaults:

- Right data structure for the access pattern: set/map for membership and
  lookup, not a linear scan over a list.
- No work inside a loop that does not depend on the loop variable.
- No repeated recomputation of the same pure value in one scope.
- Query once for N items, not N times for one item (the N+1 problem).
- Stream large inputs instead of loading them fully into memory.
- Bound result sets — paginate rather than fetching everything.
- Index the columns you filter and join on.

## Complexity

Know the complexity of what you write. Nested iteration over the same
collection is `O(n²)`; it is fine at n=20 and a defect at n=20 000. State the
expected input size when it is not obvious.

```
# bad: O(n*m)
for user in users:
    if user.id in [b.user_id for b in bans]:   # rebuilt every iteration

# good: O(n+m)
banned = {b.user_id for b in bans}
for user in users:
    if user.id in banned:
```

## Caching

- Cache only after profiling shows the cost is real.
- Every cache needs a stated invalidation rule and a bounded size. A cache
  without eviction is a memory leak with better branding.
- Prefer pure recomputation when it is cheap — a stale value is a bug that a
  slow function is not.

## Async and concurrency

- Never block the event loop / main thread with CPU work or sync IO.
- Independent IO runs concurrently (`Promise.all`, `gather`, errgroup), not in
  an awaited sequence.
- Dependent IO stays sequential — do not fake parallelism where an ordering
  requirement exists.
- Bound concurrency. Unlimited fan-out exhausts sockets, file handles, or the
  downstream service.
- Shared mutable state across tasks needs a lock or must be eliminated.

## Memory

- Release references to large objects when done, especially inside long-lived
  closures and caches.
- Avoid copying large structures to pass them; pass a view or a reference where
  the language allows it.
- Watch accumulation in long-running processes: unbounded lists, growing maps,
  listeners never removed.

## Measuring

Use the platform's profiler, not intuition. Report a number: before, after,
and what was measured. "Feels faster" is not a result.

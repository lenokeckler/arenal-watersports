# Error Handling

## Rules

1. **Never swallow.** No empty `catch`, no `except: pass`, no discarded return
   code. If you genuinely must ignore a failure, the code says so explicitly and
   states why in a comment.
2. **Catch narrow.** Catch the specific error you can handle. A blanket
   `except Exception` at a low level hides defects; it belongs only at a
   process boundary that logs and exits.
3. **Fail fast on unrecoverable state.** Corrupt config, missing required env,
   impossible branch — abort immediately with a clear message. Do not continue
   with a default and produce wrong output.
4. **Errors carry context.** The message names what was attempted, with which
   input, and what failed. `"failed"` is not a message.
5. **Do not leak internals.** The user gets a stable code and a safe message.
   Stack traces, SQL, and file paths go to logs only.
6. **Preserve the cause.** Wrap, do not replace: `raise DomainError(...) from e`,
   `throw new AppError(msg, { cause: e })`, `%w` in Go.

## Structured errors over strings

```
# bad
raise Exception("something went wrong with user 42")

# good
class UserNotFound(DomainError):
    code = "user.not_found"
    def __init__(self, user_id: str):
        super().__init__(f"user {user_id} not found")
        self.user_id = user_id
```

Callers branch on the type or code, never by matching message text.

## Result vs exception

- **Exception** for genuinely exceptional, unrecoverable-here conditions.
- **Result / tagged union** for expected outcomes the caller must decide about
  (validation failed, not found, conflict). Turning an expected outcome into an
  exception forces callers into control flow via `try`.

Whichever the project already uses, follow it. Do not mix both for the same
class of condition.

## Boundaries

Every process boundary gets exactly one handler that converts internal errors
into the external contract:

```
HTTP handler   → status code + error code + safe message
CLI entrypoint → stderr message + non-zero exit code
Job worker     → retry / dead-letter decision + log
```

Below that boundary, code raises and lets it propagate. Catch-log-rethrow at
every layer produces duplicate noise and no new information.

## Cleanup

Resources are released on every path, including the failing one — `finally`,
`defer`, `with`, RAII, `try-with-resources`. Partial mutations are rolled back
or the operation is made idempotent so a retry converges.

## Logging errors

- Log once, at the boundary that decides the outcome.
- Include: operation, identifiers, cause, and the decision taken.
- Never log credentials, tokens, full request bodies, or PII.
- Log level matters: `error` means someone should act; expected validation
  failures are `info` or `warn`.

## Async

- Every promise/future is awaited or explicitly attached to a handler. A
  floating promise is an unhandled rejection waiting to happen.
- Timeouts on every network call. No unbounded wait.
- Retries only for idempotent operations, with backoff and a cap.
- Cancellation propagates — pass the context/signal down, do not drop it.

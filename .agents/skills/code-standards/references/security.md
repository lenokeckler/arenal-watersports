# Security by Default

## Secrets

- Never in source, never in commits, never in logs, never in error responses.
- Read from environment or a secret manager, validated at startup — a missing
  required secret aborts the process rather than defaulting.
- Config files with real values are gitignored; the repo carries `.env.example`
  with empty placeholders.
- Rotate assumption: code must not embed a value that cannot be changed without
  a redeploy of source.

## Input

- Validate at the boundary, in one place, against an explicit schema: type,
  range, length, format, allowed set.
- Allowlist over denylist. Enumerate what is legal; reject everything else.
- Validation happens server-side regardless of any client-side check.
- Reject early and totally — do not sanitize into a "close enough" value that
  silently changes user intent.

## Injection

| Context          | Rule                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------- |
| SQL              | Parameterized queries only. Never string concatenation, never f-strings.                    |
| Shell            | Pass an argument array; never build a command string. Quote all variables in shell scripts. |
| HTML             | Escape on output, contextually. Do not build markup by concatenation.                       |
| Paths            | Resolve and confirm the result stays inside the intended root before opening.               |
| Templates / eval | Never pass user input to `eval`, `exec`, or a template compiled at runtime.                 |
| Deserialization  | Never deserialize untrusted data into arbitrary types.                                      |

## Output

- Encode for the destination, at the moment of output — HTML, URL, JSON, CSV,
  shell each have different escaping.
- Error responses reveal nothing about internals: no stack traces, no SQL, no
  library versions, no file paths.
- Do not reflect user input back verbatim into HTML or headers.

## AuthN / AuthZ

- Authenticate at the edge; authorize at every operation that touches data.
- Deny by default: absence of an explicit grant is a denial.
- Check ownership on every object access — an authenticated user is not
  authorized for another user's record.
- Compare secrets and tokens with a constant-time comparison.
- Sessions and tokens: short expiry, server-side revocation, rotation on
  privilege change.

## Data handling

- Passwords: a slow, salted KDF (argon2, bcrypt, scrypt). Never a raw hash.
- Encrypt in transit always; at rest for anything sensitive.
- Collect the minimum. Data you never store cannot leak.
- Redact PII and credentials from logs, traces, and analytics payloads.

## Dependencies

- Pin versions and commit the lockfile.
- Prefer the standard library over a transitive dependency tree for trivial
  functionality.
- Do not add a dependency to save fewer than ~30 lines of obvious code.

## Availability

- Bound everything: request size, page size, upload size, recursion depth,
  concurrent work, query result count.
- Timeouts on all outbound calls; rate limits on all public endpoints.

## Before finishing security-relevant code

- [ ] No secret in source or logs
- [ ] Every external input validated against a schema
- [ ] Every query parameterized; every shell call argument-array
- [ ] Every output encoded for its context
- [ ] Every data access checks ownership, not just authentication
- [ ] Error responses leak nothing internal

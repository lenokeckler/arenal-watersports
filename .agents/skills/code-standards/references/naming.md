# Naming and Zero Hardcoded Values

## No magic numbers

Any literal that is not `0`, `1`, or `-1` used as a sentinel needs a name.

```
# bad
if len(password) < 12: reject()
sleep(300)

# good
MIN_PASSWORD_LENGTH = 12
RETRY_BACKOFF_SECONDS = 300
```

The name must say _why_, not _what_: `MAX_RETRIES = 3`, not `THREE = 3`.

## No hardcoded strings

Every one of these belongs outside the call site:

| Kind                  | Where it goes                                  |
| --------------------- | ---------------------------------------------- |
| User-facing text      | i18n catalog / message constants               |
| Paths and filenames   | Config or a `paths` module                     |
| URLs and endpoints    | Config, per environment                        |
| Env var names, keys   | A constants module                             |
| Error codes, statuses | Enum or literal union                          |
| Regex patterns        | Named constant beside a comment explaining it  |
| Credentials           | Environment / secret manager — never in source |

```
# bad
raise ValueError("El usuario no existe")
r = requests.get("https://api.example.com/v1/users")

# good
ERR_USER_NOT_FOUND = "user.not_found"
raise DomainError(ERR_USER_NOT_FOUND)
r = requests.get(f"{settings.api_base_url}/v1/users")
```

The one exception: a string used exactly once, in the module that owns the
concept, where extracting it would only add indirection — e.g. a log message.
Repeated twice, it becomes a constant.

## Naming rules

- **Intent over mechanics.** `activeSubscribers`, not `filteredList`.
- **No type in the name.** `userList` → `users`. `strName` → `name`.
- **Booleans read as assertions.** `isExpired`, `hasAccess`, `canRetry`.
- **Functions are verb phrases.** `calculateTax()`, not `taxCalculation()`.
- **Symmetric pairs.** `open/close`, `start/stop`, `add/remove` — never
  `open/dismiss` or `add/delete` mixed in the same API.
- **No banned fillers:** `data`, `info`, `item`, `obj`, `tmp`, `val`, `handle`,
  `process`, `manage`, `do`, `stuff`, `helper`, `util`, `misc`, `Manager`.
- **No abbreviations** except ones universal in the domain (`id`, `url`, `http`).
- **Length tracks scope.** A 3-line loop index may be `i`. A module-level
  export may not.

## Consistency beats correctness

One concept, one word, across the whole codebase. If the project already says
`fetch`, do not introduce `retrieve`, `load`, and `get` for the same operation.
When you find a synonym drift, pick the dominant term and note the rest.

## Comments

Comments explain _why_, never _what_. Code that needs a comment to say what it
does needs a better name instead.

```
# bad
# increment counter by one
count += 1

# good
# Stripe rounds up, so we mirror it here to keep totals reconcilable.
amount = math.ceil(amount)
```

Delete commented-out code. Version control already remembers it.

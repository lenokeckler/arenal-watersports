# Testing

## What gets tested

Test where a defect would be expensive and where the logic is non-obvious:

- Business rules and calculations
- Parsing, serialization, format conversion
- State transitions and their illegal moves
- Error paths and boundary conditions
- Bug fixes — a regression test that fails before the fix and passes after
- Public module contracts

Do not test: trivial accessors, generated code, framework behaviour, or
third-party libraries.

## Structure

Arrange–Act–Assert, visually separated. One behaviour per test.

```
def test_returns_conflict_when_email_already_registered():
    # Arrange
    repo = InMemoryUserRepository([user(email="a@b.com")])
    service = SignupService(repo)

    # Act
    result = service.signup(email="a@b.com", password="…")

    # Assert
    assert result.error == ERR_EMAIL_TAKEN
```

## Naming

The name is a specification sentence, readable in a failure report without
opening the file:

```
bad:  test_user_1, test_login, it("works")
good: returns 404 when the user does not exist
      rejects a password shorter than the minimum length
      rolls back the transaction when the payment provider times out
```

## Rules

1. **Follow the project's existing conventions** — runner, file layout, naming,
   assertion style. Read an existing test before writing a new one.
2. **Independent.** No test depends on another's state or on execution order.
   Any test can run alone.
3. **Deterministic.** No reliance on wall-clock time, timezone, locale, random
   seeds, network, or filesystem state. Inject clocks and randomness.
4. **No sleeps.** Wait on a condition or a fake clock, never `sleep()`.
5. **Mock at boundaries only** — network, database, filesystem, time, third
   parties. Never mock the unit under test, and never assert on the mock's
   internals when you can assert on the observable outcome.
6. **Test the contract, not the implementation.** A test that breaks on a
   behaviour-preserving refactor is testing the wrong thing.
7. **A failing test must localize the defect.** If the message does not tell you
   what broke, add the context to the assertion.
8. **Clean up.** Reset mocks, close resources, drop fixtures between tests.

## Coverage

Coverage percentage is a diagnostic, not a target. A file at 100% whose tests
only exercise the happy path is worse than 60% with the error paths covered.
When reporting coverage, name the highest-risk untested code, not the number.

## Before finishing

- [ ] New tests actually run and pass — or intentionally fail to expose a bug
- [ ] Each test fails for exactly one reason
- [ ] No order dependence, no sleeps, no real network
- [ ] Names read as specifications
- [ ] Error and boundary cases included, not only the happy path
- [ ] No commented-out or skipped tests left behind

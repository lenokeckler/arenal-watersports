import { describe, expect, it } from "vitest";
import { isInvalidCredentialsAuthError } from "../isInvalidCredentialsAuthError";
import { BLOCKED_BY_ATTEMPTS_ERROR } from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
  RATE_LIMIT_BY_CODE_ERROR,
} from "./mapSignInAuthError.constants";

describe("isInvalidCredentialsAuthError", () => {
  it("is true for the invalid credentials rejection", () => {
    expect(
      isInvalidCredentialsAuthError(
        INVALID_CREDENTIALS_ERROR
      )
    ).toBe(true);
  });

  it.each([
    ["a hook rejection", BLOCKED_BY_ATTEMPTS_ERROR],
    ["a rate limit", RATE_LIMIT_BY_CODE_ERROR],
    ["a network error", NETWORK_ERROR],
    [
      "a non-API error carrying the same code",
      NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
    ],
  ])("is false for %s", (_name, error) => {
    expect(isInvalidCredentialsAuthError(error)).toBe(
      false
    );
  });
});

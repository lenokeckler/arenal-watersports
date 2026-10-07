import { describe, expect, it } from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_ERROR_FIELD,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { mapSignInAuthError } from "../mapSignInAuthError";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
  TOKEN_WITH_WRONG_CODE_ERROR,
  TOKEN_WITH_WRONG_STATUS_ERROR,
  UNAVAILABLE_ERROR,
  UNKNOWN_TOKEN_ERROR,
  UNKNOWN_TOKEN_MESSAGE,
} from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
  RATE_LIMIT_BY_STATUS_ERROR,
  SERVER_ERROR,
} from "./mapSignInAuthError.constants";

describe("mapSignInAuthError", () => {
  it("maps invalid credentials to the password field", () => {
    expect(
      mapSignInAuthError(INVALID_CREDENTIALS_ERROR)
    ).toEqual({
      code: SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
      field: SIGN_IN_FIELD.PASSWORD,
    });
  });

  it.each([
    ["its code", RATE_LIMIT_BY_CODE_ERROR],
    ["its status", RATE_LIMIT_BY_STATUS_ERROR],
  ])(
    "maps a rate limit recognised by %s",
    (_description, error) => {
      expect(mapSignInAuthError(error)).toEqual({
        code: SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS,
        field: SIGN_IN_FIELD.FORM,
      });
    }
  );

  it("maps a retryable fetch failure to a network error", () => {
    expect(mapSignInAuthError(NETWORK_ERROR).code).toBe(
      SIGN_IN_ERROR_CODE.NETWORK
    );
  });

  it("maps any other auth failure to unknown", () => {
    expect(mapSignInAuthError(SERVER_ERROR)).toEqual({
      code: SIGN_IN_ERROR_CODE.UNKNOWN,
      field: SIGN_IN_FIELD.FORM,
    });
  });

  it.each([
    [
      "blocked by attempts",
      BLOCKED_BY_ATTEMPTS_ERROR,
      SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    ],
    [
      "blocked by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
      SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    ],
    [
      "unavailable",
      UNAVAILABLE_ERROR,
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
    ],
  ])(
    "maps a %s hook rejection to its sign-in code",
    (_name, error, code) => {
      expect(mapSignInAuthError(error)).toEqual({
        code,
        field: SIGN_IN_ERROR_FIELD[code],
      });
    }
  );

  it.each([
    ["an unknown token", UNKNOWN_TOKEN_ERROR],
    [
      "a token with the wrong status",
      TOKEN_WITH_WRONG_STATUS_ERROR,
    ],
    [
      "a token with the wrong code",
      TOKEN_WITH_WRONG_CODE_ERROR,
    ],
  ])("maps %s to unknown", (_name, error) => {
    expect(mapSignInAuthError(error).code).toBe(
      SIGN_IN_ERROR_CODE.UNKNOWN
    );
  });

  it("never copies the upstream message into the result", () => {
    expect(
      JSON.stringify(
        mapSignInAuthError(UNKNOWN_TOKEN_ERROR)
      )
    ).not.toContain(UNKNOWN_TOKEN_MESSAGE);
  });
});

import { describe, expect, it } from "vitest";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { mapTemporaryPasswordError } from "../mapTemporaryPasswordError";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
  UNAVAILABLE_ERROR,
} from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  NON_API_ERROR,
  NON_API_ERROR_WITH_HOOK_REJECTION,
  NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
  RATE_LIMIT_BY_CODE_ERROR,
  RATE_LIMIT_BY_STATUS_ERROR,
  SERVER_ERROR,
} from "./mapSignInAuthError.constants";

describe("mapTemporaryPasswordError", () => {
  it.each([
    [
      "invalid credentials",
      INVALID_CREDENTIALS_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    ],
    [
      "an unavailable account",
      UNAVAILABLE_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    ],
    [
      "a block by attempts",
      BLOCKED_BY_ATTEMPTS_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    ],
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    ],
    [
      "a network error",
      NETWORK_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.NETWORK,
    ],
    [
      "a rate limit",
      RATE_LIMIT_BY_CODE_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
    [
      "a rate limit by status",
      RATE_LIMIT_BY_STATUS_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
    [
      "an invalid credentials code on a non API error",
      NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
      FIRST_SIGN_IN_ERROR_CODE.UNKNOWN,
    ],
    [
      "a hook rejection on a non API error",
      NON_API_ERROR_WITH_HOOK_REJECTION,
      FIRST_SIGN_IN_ERROR_CODE.UNKNOWN,
    ],
    [
      "a server error",
      SERVER_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.UNKNOWN,
    ],
    [
      "an unclassified error",
      NON_API_ERROR,
      FIRST_SIGN_IN_ERROR_CODE.UNKNOWN,
    ],
  ])("maps %s", (_name, error, code) => {
    expect(mapTemporaryPasswordError(error).code).toBe(
      code
    );
  });
});

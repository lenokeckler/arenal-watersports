import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_CHANGE_FIELD,
} from "@/app/constants";
import { mapCurrentPasswordError } from "../mapCurrentPasswordError";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
  RECOVERY_REQUIRED_ERROR,
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

describe("mapCurrentPasswordError", () => {
  it.each([
    [
      "invalid credentials",
      INVALID_CREDENTIALS_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    ],
    [
      "an unavailable account",
      UNAVAILABLE_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    ],
    [
      "a block by attempts",
      BLOCKED_BY_ATTEMPTS_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    ],
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    ],
    [
      "a recovery required refusal",
      RECOVERY_REQUIRED_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
    ],
    [
      "a network error",
      NETWORK_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NETWORK,
    ],
    [
      "a rate limit",
      RATE_LIMIT_BY_CODE_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
    [
      "a rate limit by status",
      RATE_LIMIT_BY_STATUS_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
    [
      "an invalid credentials code on a non API error",
      NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
    ],
    [
      "a hook rejection on a non API error",
      NON_API_ERROR_WITH_HOOK_REJECTION,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
    ],
    [
      "a server error",
      SERVER_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
    ],
    [
      "an unclassified error",
      NON_API_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
    ],
  ])("maps %s", (_name, error, code) => {
    expect(mapCurrentPasswordError(error).code).toBe(code);
  });

  it("places a recovery required refusal on the form", () => {
    expect(
      mapCurrentPasswordError(RECOVERY_REQUIRED_ERROR)
    ).toEqual({
      code: PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
      field: PASSWORD_CHANGE_FIELD.FORM,
    });
  });
});

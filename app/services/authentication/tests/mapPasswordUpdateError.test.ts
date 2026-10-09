import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { mapPasswordUpdateError } from "../mapPasswordUpdateError";
import {
  NETWORK_ERROR,
  NON_API_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
  SERVER_ERROR,
} from "./mapSignInAuthError.constants";
import {
  SAME_PASSWORD_ERROR,
  VALIDATION_FAILED_ERROR,
  WEAK_PASSWORD_ERROR,
} from "./passwordUpdateErrors.constants";

describe("mapPasswordUpdateError", () => {
  it.each([
    [
      "the same password",
      SAME_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    ],
    [
      "a weak password",
      WEAK_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
    ],
    [
      "a failed validation",
      VALIDATION_FAILED_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
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
    expect(mapPasswordUpdateError(error).code).toBe(code);
  });
});

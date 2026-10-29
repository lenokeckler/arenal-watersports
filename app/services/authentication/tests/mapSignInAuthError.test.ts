import { describe, expect, it } from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { mapSignInAuthError } from "../mapSignInAuthError";
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
});

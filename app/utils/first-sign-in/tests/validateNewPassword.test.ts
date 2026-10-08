import { describe, expect, it } from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createFirstSignInError } from "../createFirstSignInError";
import { validateNewPassword } from "../validateNewPassword";
import {
  COMPLIANT_PASSWORD_AT_MAX,
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  PASSWORD_ONE_ABOVE_MAX,
  WEAK_PASSWORD,
} from "./firstSignIn.constants";

describe("validateNewPassword", () => {
  it("requires a password", () => {
    expect(validateNewPassword(STRING.Empty)).toEqual(
      createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_REQUIRED
      )
    );
  });

  it("rejects a password above the maximum length", () => {
    expect(
      validateNewPassword(PASSWORD_ONE_ABOVE_MAX)
    ).toEqual(
      createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG
      )
    );
  });

  it("rejects a password that breaks a rule", () => {
    expect(validateNewPassword(WEAK_PASSWORD)).toEqual(
      createFirstSignInError(
        FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
      )
    );
  });

  it("accepts a compliant password", () => {
    expect(
      validateNewPassword(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword
      )
    ).toBeNull();
  });

  it("accepts a compliant password at the maximum length", () => {
    expect(
      validateNewPassword(COMPLIANT_PASSWORD_AT_MAX)
    ).toBeNull();
  });
});

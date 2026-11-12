import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import { validateNewPassword } from "../validateNewPassword";
import {
  ACCENTED_PASSWORD_AT_MAX,
  COMPLIANT_PASSWORD_AT_MAX,
  DEFAULT_PASSWORD_CHANGE_INPUT,
  PASSWORD_ONE_ABOVE_MAX,
  WEAK_PASSWORD,
} from "./passwordChange.constants";

describe("validateNewPassword", () => {
  it("requires a password", () => {
    expect(validateNewPassword(STRING.Empty)).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_REQUIRED
      )
    );
  });

  it("rejects a password above the maximum length", () => {
    expect(
      validateNewPassword(PASSWORD_ONE_ABOVE_MAX)
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG
      )
    );
  });

  it("rejects a password that breaks a rule", () => {
    expect(validateNewPassword(WEAK_PASSWORD)).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
      )
    );
  });

  it("accepts a compliant password", () => {
    expect(
      validateNewPassword(
        DEFAULT_PASSWORD_CHANGE_INPUT.newPassword
      )
    ).toBeNull();
  });

  it("accepts a compliant password at the maximum length", () => {
    expect(
      validateNewPassword(COMPLIANT_PASSWORD_AT_MAX)
    ).toBeNull();
  });

  it("flags a password within the character limit whose UTF-8 encoding exceeds the byte limit as too long", () => {
    expect(
      validateNewPassword(ACCENTED_PASSWORD_AT_MAX)
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG
      )
    );
  });
});

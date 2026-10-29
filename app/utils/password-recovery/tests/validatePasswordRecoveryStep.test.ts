import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import { validatePasswordRecoveryNewPassword } from "../validatePasswordRecoveryNewPassword";
import { validatePasswordRecoveryPin } from "../validatePasswordRecoveryPin";

const VALID_PIN_INPUT = {
  pin: "482913",
  username: "worker.one",
};
const STRONG_PASSWORD = "Brisa-Del-Lago-2026";

describe("validatePasswordRecoveryPin", () => {
  it("accepts a username and a six-digit PIN", () => {
    expect(
      validatePasswordRecoveryPin(VALID_PIN_INPUT)
    ).toBeNull();
  });

  it("reports the username first", () => {
    expect(
      validatePasswordRecoveryPin({
        pin: STRING.Empty,
        username: STRING.Empty,
      })
    ).toEqual({
      code: PASSWORD_RECOVERY_ERROR_CODE.USERNAME_REQUIRED,
      field: PASSWORD_RECOVERY_FIELD.USERNAME,
    });
  });

  it("reports a missing PIN on the PIN field", () => {
    expect(
      validatePasswordRecoveryPin({
        ...VALID_PIN_INPUT,
        pin: STRING.Empty,
      })
    ).toEqual({
      code: PASSWORD_RECOVERY_ERROR_CODE.PIN_REQUIRED,
      field: PASSWORD_RECOVERY_FIELD.PIN,
    });
  });
});

describe("validatePasswordRecoveryNewPassword", () => {
  it("accepts a password that follows the rules, written twice", () => {
    expect(
      validatePasswordRecoveryNewPassword({
        confirmPassword: STRONG_PASSWORD,
        newPassword: STRONG_PASSWORD,
      })
    ).toBeNull();
  });

  it("reports a missing password on its field", () => {
    expect(
      validatePasswordRecoveryNewPassword({
        confirmPassword: STRING.Empty,
        newPassword: STRING.Empty,
      })
    ).toEqual({
      code: PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_REQUIRED,
      field: PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    });
  });

  it("reports a different confirmation on the confirmation field", () => {
    expect(
      validatePasswordRecoveryNewPassword({
        confirmPassword: `${STRONG_PASSWORD}x`,
        newPassword: STRONG_PASSWORD,
      })
    ).toEqual({
      code: PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH,
      field: PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
    });
  });
});

import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import { COMMON_PASSWORD_THAT_MEETS_THE_RULES } from "@/app/services/password-policy/tests/commonPassword.constants";
import { validatePasswordRecoveryResetOnServer } from "../validatePasswordRecoveryResetOnServer";
import {
  RESET_INPUT,
  RESET_SHORT_PIN,
} from "./passwordRecoveryReset.constants";

const COMMON_PASSWORD_INPUT = {
  ...RESET_INPUT,
  confirmPassword: COMMON_PASSWORD_THAT_MEETS_THE_RULES,
  newPassword: COMMON_PASSWORD_THAT_MEETS_THE_RULES,
};

describe("validatePasswordRecoveryResetOnServer", () => {
  it("accepts a valid reset with an uncommon password", () => {
    expect(
      validatePasswordRecoveryResetOnServer(RESET_INPUT)
    ).toBeNull();
  });

  it("refuses a common password on the new password field", () => {
    expect(
      validatePasswordRecoveryResetOnServer(
        COMMON_PASSWORD_INPUT
      )
    ).toEqual({
      code: PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_COMMON,
      field: PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    });
  });

  it("reports the form errors before the common password", () => {
    expect(
      validatePasswordRecoveryResetOnServer({
        ...COMMON_PASSWORD_INPUT,
        pin: RESET_SHORT_PIN,
      })
    ).toMatchObject({
      code: PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT,
    });
  });
});

import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import type { PasswordRecoveryNewPasswordInput } from "../models/PasswordRecoveryNewPasswordInput.interface";
import { validatePasswordRecoveryNewPassword } from "../validatePasswordRecoveryNewPassword";
import {
  DEFAULT_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT,
  MISMATCHED_CONFIRMATION,
  OVERLONG_NEW_PASSWORD,
  WEAK_NEW_PASSWORD,
} from "./passwordRecovery.constants";

const withOverrides = (
  overrides: Partial<PasswordRecoveryNewPasswordInput>
) =>
  validatePasswordRecoveryNewPassword({
    ...DEFAULT_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT,
    ...overrides,
  });

const passwordCases: [
  string,
  Partial<PasswordRecoveryNewPasswordInput>,
  PasswordRecoveryErrorCode,
][] = [
  [
    "an empty new password",
    { newPassword: STRING.Empty },
    PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_REQUIRED,
  ],
  [
    "a weak new password",
    { newPassword: WEAK_NEW_PASSWORD },
    PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "a too long new password",
    {
      confirmPassword: OVERLONG_NEW_PASSWORD,
      newPassword: OVERLONG_NEW_PASSWORD,
    },
    PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  ],
  [
    "an empty confirmation",
    { confirmPassword: STRING.Empty },
    PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_REQUIRED,
  ],
  [
    "a mismatching confirmation",
    { confirmPassword: MISMATCHED_CONFIRMATION },
    PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
];

describe("validatePasswordRecoveryNewPassword edge cases", () => {
  it.each(passwordCases)(
    "reports %s with its own recovery code",
    (_label, overrides, expectedCode) => {
      expect(withOverrides(overrides)).toEqual(
        createPasswordRecoveryError(expectedCode)
      );
    }
  );

  it("reports the too long password before a mismatching confirmation", () => {
    expect(
      withOverrides({
        confirmPassword: MISMATCHED_CONFIRMATION,
        newPassword: OVERLONG_NEW_PASSWORD,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_TOO_LONG
      )
    );
  });

  it("reports the weak password before an empty confirmation", () => {
    expect(
      withOverrides({
        confirmPassword: STRING.Empty,
        newPassword: WEAK_NEW_PASSWORD,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES
      )
    );
  });
});

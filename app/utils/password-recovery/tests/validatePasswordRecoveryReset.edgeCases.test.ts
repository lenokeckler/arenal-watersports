import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import type { PasswordRecoveryResetInput } from "../models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryReset } from "../validatePasswordRecoveryReset";
import {
  DEFAULT_PASSWORD_RECOVERY_RESET_INPUT,
  MISMATCHED_CONFIRMATION,
  OVERLONG_NEW_PASSWORD,
  PIN_WITH_LETTER,
  UNNORMALIZED_USERNAME,
  WEAK_NEW_PASSWORD,
} from "./passwordRecovery.constants";

const withOverrides = (
  overrides: Partial<PasswordRecoveryResetInput>
) =>
  validatePasswordRecoveryReset({
    ...DEFAULT_PASSWORD_RECOVERY_RESET_INPUT,
    ...overrides,
  });

const resetCases: [
  string,
  Partial<PasswordRecoveryResetInput>,
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

describe("validatePasswordRecoveryReset edge cases", () => {
  it("accepts a padded uppercase username like sign-in does", () => {
    expect(
      withOverrides({ username: UNNORMALIZED_USERNAME })
    ).toBeNull();
  });

  it.each(resetCases)(
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

  it("reports the PIN before a missing new password", () => {
    expect(
      withOverrides({
        newPassword: STRING.Empty,
        pin: PIN_WITH_LETTER,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT
      )
    );
  });
});

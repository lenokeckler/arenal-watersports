import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import type { PasswordRecoveryResetInput } from "../models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryReset } from "../validatePasswordRecoveryReset";
import {
  DEFAULT_PASSWORD_RECOVERY_RESET_INPUT,
  EMPTY_PIN,
  MISMATCHED_CONFIRMATION,
  PIN_WITH_LETTER,
  SHORT_USERNAME,
  WEAK_NEW_PASSWORD,
} from "./passwordRecovery.constants";

const withOverrides = (
  overrides: Partial<PasswordRecoveryResetInput>
) =>
  validatePasswordRecoveryReset({
    ...DEFAULT_PASSWORD_RECOVERY_RESET_INPUT,
    ...overrides,
  });

describe("validatePasswordRecoveryReset", () => {
  it("accepts a complete valid input", () => {
    expect(withOverrides({})).toBeNull();
  });

  it("reports the username first", () => {
    expect(
      withOverrides({
        confirmPassword: MISMATCHED_CONFIRMATION,
        newPassword: WEAK_NEW_PASSWORD,
        pin: EMPTY_PIN,
        username: SHORT_USERNAME,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH
      )
    );
  });

  it("reports the PIN before the passwords", () => {
    expect(
      withOverrides({
        confirmPassword: MISMATCHED_CONFIRMATION,
        newPassword: WEAK_NEW_PASSWORD,
        pin: PIN_WITH_LETTER,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT
      )
    );
  });

  it("requires the PIN when it is empty", () => {
    expect(withOverrides({ pin: EMPTY_PIN })).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.PIN_REQUIRED
      )
    );
  });

  it("reports the new password rules before the confirmation", () => {
    expect(
      withOverrides({
        confirmPassword: MISMATCHED_CONFIRMATION,
        newPassword: WEAK_NEW_PASSWORD,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES
      )
    );
  });

  it("requires the new password when it is empty", () => {
    expect(
      withOverrides({ newPassword: STRING.Empty })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_REQUIRED
      )
    );
  });

  it("reports a mismatching confirmation last", () => {
    expect(
      withOverrides({
        confirmPassword: MISMATCHED_CONFIRMATION,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    );
  });

  it("requires the confirmation when it is empty", () => {
    expect(
      withOverrides({ confirmPassword: STRING.Empty })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_REQUIRED
      )
    );
  });
});

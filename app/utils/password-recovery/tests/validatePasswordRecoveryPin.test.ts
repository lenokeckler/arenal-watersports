import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import type { PasswordRecoveryPinInput } from "../models/PasswordRecoveryPinInput.interface";
import { validatePasswordRecoveryPin } from "../validatePasswordRecoveryPin";
import {
  DEFAULT_PASSWORD_RECOVERY_PIN_INPUT,
  EMPTY_PIN,
  PIN_WITH_LETTER,
  SHORT_USERNAME,
  UNNORMALIZED_USERNAME,
} from "./passwordRecovery.constants";

const withOverrides = (
  overrides: Partial<PasswordRecoveryPinInput>
) =>
  validatePasswordRecoveryPin({
    ...DEFAULT_PASSWORD_RECOVERY_PIN_INPUT,
    ...overrides,
  });

describe("validatePasswordRecoveryPin", () => {
  it("accepts a username and a six-digit PIN", () => {
    expect(withOverrides({})).toBeNull();
  });

  it("accepts a padded uppercase username like sign-in does", () => {
    expect(
      withOverrides({ username: UNNORMALIZED_USERNAME })
    ).toBeNull();
  });

  it("reports the username first", () => {
    expect(
      withOverrides({
        pin: EMPTY_PIN,
        username: SHORT_USERNAME,
      })
    ).toEqual(
      createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.USERNAME_LENGTH
      )
    );
  });

  it("reports a PIN that is not six digits", () => {
    expect(withOverrides({ pin: PIN_WITH_LETTER })).toEqual(
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
});

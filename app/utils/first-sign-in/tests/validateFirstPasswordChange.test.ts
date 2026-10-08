import { describe, expect, it } from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  STRING,
  type FirstSignInErrorCode,
} from "@/app/constants";
import { createFirstSignInError } from "../createFirstSignInError";
import type { FirstPasswordChangeInput } from "../models/FirstPasswordChangeInput.interface";
import { validateFirstPasswordChange } from "../validateFirstPasswordChange";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
  PASSWORD_ONE_ABOVE_MAX,
  WEAK_PASSWORD,
} from "./firstSignIn.constants";

const failureCases: [
  string,
  Partial<FirstPasswordChangeInput>,
  FirstSignInErrorCode,
][] = [
  [
    "an empty temporary password",
    { currentPassword: STRING.Empty },
    FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
  ],
  [
    "an empty new password",
    { newPassword: STRING.Empty },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_REQUIRED,
  ],
  [
    "a new password above the maximum length",
    { newPassword: PASSWORD_ONE_ABOVE_MAX },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  ],
  [
    "a new password that breaks the rules",
    { newPassword: WEAK_PASSWORD },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "a new password equal to the temporary one",
    {
      currentPassword:
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
  ],
  [
    "an empty confirmation",
    { confirmPassword: STRING.Empty },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_REQUIRED,
  ],
  [
    "a confirmation that differs from the new password",
    { confirmPassword: MISMATCHED_CONFIRMATION },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
];

const precedenceCases: [
  string,
  Partial<FirstPasswordChangeInput>,
  FirstSignInErrorCode,
][] = [
  [
    "the temporary password before the new password",
    {
      currentPassword: STRING.Empty,
      newPassword: STRING.Empty,
    },
    FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
  ],
  [
    "the rules before equality with the temporary password",
    {
      currentPassword: WEAK_PASSWORD,
      newPassword: WEAK_PASSWORD,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "equality with the temporary password before the confirmation",
    {
      confirmPassword: STRING.Empty,
      currentPassword:
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
  ],
  [
    "a missing confirmation before a mismatch",
    { confirmPassword: STRING.Empty },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_REQUIRED,
  ],
];

const validate = (
  overrides: Partial<FirstPasswordChangeInput>
) =>
  validateFirstPasswordChange({
    ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
    ...overrides,
  });

describe("validateFirstPasswordChange", () => {
  it("accepts a complete, compliant, confirmed change", () => {
    expect(
      validateFirstPasswordChange(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
      )
    ).toBeNull();
  });

  it.each(failureCases)(
    "rejects %s",
    (_, overrides, code) => {
      expect(validate(overrides)).toEqual(
        createFirstSignInError(code)
      );
    }
  );

  it.each(precedenceCases)(
    "reports %s",
    (_, overrides, code) => {
      expect(validate(overrides)).toEqual(
        createFirstSignInError(code)
      );
    }
  );
});

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
  NEW_PASSWORD_IN_OTHER_CASE,
  NEW_PASSWORD_WITH_TRAILING_SPACE,
  PASSWORD_ONE_ABOVE_MAX,
  TEMPORARY_PASSWORD_IN_OTHER_CASE,
  WEAK_PASSWORD,
  WHITESPACE_ONLY_PASSWORD,
} from "./firstSignIn.constants";
import { validateWithOverrides } from "./validateWithOverrides";

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
  [
    "a confirmation that differs only in case",
    { confirmPassword: NEW_PASSWORD_IN_OTHER_CASE },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
  [
    "a confirmation with a trailing space",
    { confirmPassword: NEW_PASSWORD_WITH_TRAILING_SPACE },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
  [
    "a whitespace-only new password",
    { newPassword: WHITESPACE_ONLY_PASSWORD },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "a whitespace-only confirmation",
    { confirmPassword: WHITESPACE_ONLY_PASSWORD },
    FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
];

const acceptedCases: [
  string,
  Partial<FirstPasswordChangeInput>,
][] = [
  [
    "a temporary password that differs only in case",
    { currentPassword: TEMPORARY_PASSWORD_IN_OTHER_CASE },
  ],
  [
    "a new password that differs from the temporary one by a trailing space",
    {
      confirmPassword: NEW_PASSWORD_WITH_TRAILING_SPACE,
      currentPassword:
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT.newPassword,
      newPassword: NEW_PASSWORD_WITH_TRAILING_SPACE,
    },
  ],
  [
    "a whitespace-only temporary password, leaving it to the server",
    { currentPassword: WHITESPACE_ONLY_PASSWORD },
  ],
];

describe("validateFirstPasswordChange fields", () => {
  it("accepts a complete, compliant, confirmed change", () => {
    expect(
      validateFirstPasswordChange(
        DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
      )
    ).toBeNull();
  });

  it.each(acceptedCases)("accepts %s", (_, overrides) => {
    expect(validateWithOverrides(overrides)).toBeNull();
  });

  it.each(failureCases)(
    "rejects %s",
    (_, overrides, code) => {
      expect(validateWithOverrides(overrides)).toEqual(
        createFirstSignInError(code)
      );
    }
  );
});

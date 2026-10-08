import { describe, expect, it } from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  STRING,
  type FirstSignInErrorCode,
} from "@/app/constants";
import { createFirstSignInError } from "../createFirstSignInError";
import type { FirstPasswordChangeInput } from "../models/FirstPasswordChangeInput.interface";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
  PASSWORD_ONE_ABOVE_MAX,
  WEAK_PASSWORD,
  WEAK_PASSWORD_ABOVE_MAX,
} from "./firstSignIn.constants";
import { validateWithOverrides } from "./validateWithOverrides";

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
    "the maximum length before the rules",
    { newPassword: WEAK_PASSWORD_ABOVE_MAX },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  ],
  [
    "the maximum length before equality with the temporary password",
    {
      currentPassword: PASSWORD_ONE_ABOVE_MAX,
      newPassword: PASSWORD_ONE_ABOVE_MAX,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  ],
  [
    "the rules before an empty confirmation",
    {
      confirmPassword: STRING.Empty,
      newPassword: WEAK_PASSWORD,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "the rules before a confirmation mismatch",
    {
      confirmPassword: MISMATCHED_CONFIRMATION,
      newPassword: WEAK_PASSWORD,
    },
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "equality with the temporary password before a mismatch",
    {
      confirmPassword: MISMATCHED_CONFIRMATION,
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

describe("validateFirstPasswordChange precedence", () => {
  it.each(precedenceCases)(
    "reports %s",
    (_, overrides, code) => {
      expect(validateWithOverrides(overrides)).toEqual(
        createFirstSignInError(code)
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
  type PasswordChangeErrorCode,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import type { PasswordChangeInput } from "../models/PasswordChangeInput.interface";
import { validatePasswordChange } from "../validatePasswordChange";
import {
  ACCENTED_PASSWORD_AT_MAX,
  DEFAULT_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
  NEW_PASSWORD_IN_OTHER_CASE,
  NEW_PASSWORD_WITH_TRAILING_SPACE,
  PASSWORD_ONE_ABOVE_MAX,
  TEMPORARY_PASSWORD_IN_OTHER_CASE,
  WEAK_PASSWORD,
  WEAK_PASSWORD_ABOVE_MAX,
  WHITESPACE_ONLY_PASSWORD,
} from "./passwordChange.constants";
import { validateWithOverrides } from "./validateWithOverrides";

const failureCases: [
  string,
  Partial<PasswordChangeInput>,
  PasswordChangeErrorCode,
][] = [
  [
    "an empty temporary password",
    { currentPassword: STRING.Empty },
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
  ],
  [
    "a temporary password above the maximum length",
    { currentPassword: WEAK_PASSWORD_ABOVE_MAX },
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG,
  ],
  [
    "a temporary password above the maximum bytes",
    { currentPassword: ACCENTED_PASSWORD_AT_MAX },
    PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG,
  ],
  [
    "an empty new password",
    { newPassword: STRING.Empty },
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_REQUIRED,
  ],
  [
    "a new password above the maximum length",
    { newPassword: PASSWORD_ONE_ABOVE_MAX },
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  ],
  [
    "a new password that breaks the rules",
    { newPassword: WEAK_PASSWORD },
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "a new password equal to the temporary one",
    {
      currentPassword:
        DEFAULT_PASSWORD_CHANGE_INPUT.newPassword,
    },
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
  ],
  [
    "an empty confirmation",
    { confirmPassword: STRING.Empty },
    PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_REQUIRED,
  ],
  [
    "a confirmation that differs from the new password",
    { confirmPassword: MISMATCHED_CONFIRMATION },
    PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
  [
    "a confirmation that differs only in case",
    { confirmPassword: NEW_PASSWORD_IN_OTHER_CASE },
    PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
  [
    "a confirmation with a trailing space",
    { confirmPassword: NEW_PASSWORD_WITH_TRAILING_SPACE },
    PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
  [
    "a whitespace-only new password",
    { newPassword: WHITESPACE_ONLY_PASSWORD },
    PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
  ],
  [
    "a whitespace-only confirmation",
    { confirmPassword: WHITESPACE_ONLY_PASSWORD },
    PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH,
  ],
];

const acceptedCases: [
  string,
  Partial<PasswordChangeInput>,
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
        DEFAULT_PASSWORD_CHANGE_INPUT.newPassword,
      newPassword: NEW_PASSWORD_WITH_TRAILING_SPACE,
    },
  ],
  [
    "a whitespace-only temporary password, leaving it to the server",
    { currentPassword: WHITESPACE_ONLY_PASSWORD },
  ],
];

describe("validatePasswordChange fields", () => {
  it("accepts a complete, compliant, confirmed change", () => {
    expect(
      validatePasswordChange(DEFAULT_PASSWORD_CHANGE_INPUT)
    ).toBeNull();
  });

  it.each(acceptedCases)("accepts %s", (_, overrides) => {
    expect(validateWithOverrides(overrides)).toBeNull();
  });

  it.each(failureCases)(
    "rejects %s",
    (_, overrides, code) => {
      expect(validateWithOverrides(overrides)).toEqual(
        createPasswordChangeError(code)
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import { validatePasswordConfirmation } from "../validatePasswordConfirmation";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
  NEW_PASSWORD_IN_OTHER_CASE,
  NEW_PASSWORD_WITH_TRAILING_SPACE,
} from "./passwordChange.constants";

const { newPassword } = DEFAULT_PASSWORD_CHANGE_INPUT;

const mismatchedConfirmations: [string, string][] = [
  ["a different value", MISMATCHED_CONFIRMATION],
  [
    "a value that differs only in case",
    NEW_PASSWORD_IN_OTHER_CASE,
  ],
  [
    "a value with a trailing space",
    NEW_PASSWORD_WITH_TRAILING_SPACE,
  ],
];

describe("validatePasswordConfirmation", () => {
  it("accepts a confirmation equal to the new password", () => {
    expect(
      validatePasswordConfirmation(newPassword, newPassword)
    ).toBeNull();
  });

  it("requires a confirmation", () => {
    expect(
      validatePasswordConfirmation(
        newPassword,
        STRING.Empty
      )
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_REQUIRED
      )
    );
  });

  it.each(mismatchedConfirmations)(
    "rejects %s as a mismatch",
    (_, confirmPassword) => {
      expect(
        validatePasswordConfirmation(
          newPassword,
          confirmPassword
        )
      ).toEqual(
        createPasswordChangeError(
          PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
        )
      );
    }
  );

  it("does not judge an empty new password", () => {
    expect(
      validatePasswordConfirmation(
        STRING.Empty,
        STRING.Empty
      )
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_REQUIRED
      )
    );
  });
});

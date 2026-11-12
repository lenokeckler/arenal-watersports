import { describe, expect, it } from "vitest";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordChangeError } from "../createPasswordChangeError";
import { validatePasswordConfirmation } from "../validatePasswordConfirmation";
import {
  COMPOSED_ACCENTED_PASSWORD,
  DECOMPOSED_ACCENTED_PASSWORD,
  DEFAULT_PASSWORD_CHANGE_INPUT,
  MISMATCHED_CONFIRMATION,
  NEW_PASSWORD_IN_OTHER_CASE,
  NEW_PASSWORD_WITH_TRAILING_SPACE,
  VERY_LONG_PASSWORD,
  VERY_LONG_PASSWORD_WITH_LAST_CHARACTER_CHANGED,
  WHITESPACE_ONLY_PASSWORD,
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
  ["a whitespace-only value", WHITESPACE_ONLY_PASSWORD],
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
        newPassword
      )
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    );
  });

  it("rejects a canonically equivalent but differently normalised confirmation", () => {
    expect(
      validatePasswordConfirmation(
        COMPOSED_ACCENTED_PASSWORD,
        DECOMPOSED_ACCENTED_PASSWORD
      )
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    );
  });

  it("accepts a very long confirmation equal to the new password", () => {
    expect(
      validatePasswordConfirmation(
        VERY_LONG_PASSWORD,
        VERY_LONG_PASSWORD
      )
    ).toBeNull();
  });

  it("rejects a very long confirmation that differs in its last character", () => {
    expect(
      validatePasswordConfirmation(
        VERY_LONG_PASSWORD,
        VERY_LONG_PASSWORD_WITH_LAST_CHARACTER_CHANGED
      )
    ).toEqual(
      createPasswordChangeError(
        PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
      )
    );
  });
});

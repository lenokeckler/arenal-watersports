import { describe, expect, it } from "vitest";
import { ACCESS_SHARED_COPY } from "@/app/constants";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import {
  APPROVED_SHARED_PASSWORD_COPY,
  NON_USTED_WORDS_PATTERN,
} from "./FirstSignInErrorCopy.constants";

describe("first sign-in error copy", () => {
  it.each(Object.values(PASSWORD_CHANGE_ERROR_CODE))(
    "has usted copy for %s",
    (code) => {
      expect(FIRST_SIGN_IN_ERROR_COPY[code]).not.toBe("");
      expect(FIRST_SIGN_IN_ERROR_COPY[code]).not.toMatch(
        NON_USTED_WORDS_PATTERN
      );
    }
  );

  it("words the recovery required refusal with the shared message", () => {
    expect(
      FIRST_SIGN_IN_ERROR_COPY[
        PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
      ]
    ).toBe(ACCESS_SHARED_COPY.ACCOUNT_RECOVERY_REQUIRED);
  });

  it("pins the new password and confirmation texts", () => {
    expect(FIRST_SIGN_IN_ERROR_COPY).toMatchObject(
      APPROVED_SHARED_PASSWORD_COPY
    );
  });
});

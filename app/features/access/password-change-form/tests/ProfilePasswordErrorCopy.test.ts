import { describe, expect, it } from "vitest";
import { ACCESS_SHARED_COPY } from "@/app/constants";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { PROFILE_PASSWORD_ERROR_COPY } from "../constants/ProfilePasswordErrorCopy.constants";
import { NON_USTED_WORDS_PATTERN } from "./FirstSignInErrorCopy.constants";
import {
  PROFILE_ERROR_COPY_OVERRIDES,
  TEMPORARY_WORD_PATTERN,
} from "./ProfilePasswordCopy.constants";

describe("profile password error copy", () => {
  it.each(Object.values(PASSWORD_CHANGE_ERROR_CODE))(
    "has usted copy for %s that never mentions a temporary password",
    (code) => {
      expect(PROFILE_PASSWORD_ERROR_COPY[code]).not.toBe(
        ""
      );
      expect(PROFILE_PASSWORD_ERROR_COPY[code]).not.toMatch(
        NON_USTED_WORDS_PATTERN
      );
      expect(PROFILE_PASSWORD_ERROR_COPY[code]).not.toMatch(
        TEMPORARY_WORD_PATTERN
      );
    }
  );

  it.each(PROFILE_ERROR_COPY_OVERRIDES)(
    "words %s for the current password",
    (code, message) => {
      expect(PROFILE_PASSWORD_ERROR_COPY[code]).toBe(
        message
      );
    }
  );

  it.each(PROFILE_ERROR_COPY_OVERRIDES)(
    "words %s differently from the first sign-in copy",
    (code) => {
      expect(PROFILE_PASSWORD_ERROR_COPY[code]).not.toBe(
        FIRST_SIGN_IN_ERROR_COPY[code]
      );
    }
  );

  it("words the recovery required refusal with the shared message", () => {
    expect(
      PROFILE_PASSWORD_ERROR_COPY[
        PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
      ]
    ).toBe(ACCESS_SHARED_COPY.ACCOUNT_RECOVERY_REQUIRED);
  });
});

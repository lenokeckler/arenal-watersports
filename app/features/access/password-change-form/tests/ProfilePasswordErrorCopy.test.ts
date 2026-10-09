import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
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
});

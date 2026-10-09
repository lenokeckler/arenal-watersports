import { describe, expect, it } from "vitest";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants/access/PasswordChangeError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { NON_USTED_WORDS_PATTERN } from "./FirstSignInErrorCopy.constants";

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
});

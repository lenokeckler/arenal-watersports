import { describe, expect, it } from "vitest";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants/access/FirstSignInError.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "../constants/FirstSignInErrorCopy.constants";
import { NON_USTED_WORDS_PATTERN } from "./FirstSignInErrorCopy.constants";

describe("first sign-in error copy", () => {
  it.each(Object.values(FIRST_SIGN_IN_ERROR_CODE))(
    "has usted copy for %s",
    (code) => {
      expect(FIRST_SIGN_IN_ERROR_COPY[code]).not.toBe("");
      expect(FIRST_SIGN_IN_ERROR_COPY[code]).not.toMatch(
        NON_USTED_WORDS_PATTERN
      );
    }
  );
});

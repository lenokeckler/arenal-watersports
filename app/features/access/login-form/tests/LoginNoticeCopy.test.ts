import { describe, expect, it } from "vitest";
import { LOGIN_FORM_COPY } from "../constants/LoginFormCopy.constants";
import { NON_USTED_WORDS_PATTERN } from "./SignInErrorCopy.constants";

describe("login notice copy", () => {
  it.each([
    [
      "password recovered",
      LOGIN_FORM_COPY.PASSWORD_RECOVERED_NOTICE,
    ],
    ["signed out", LOGIN_FORM_COPY.SIGNED_OUT_NOTICE],
  ])(
    "has non-empty usted copy for the %s notice",
    (_label, text) => {
      expect(text).not.toBe("");
      expect(text).not.toMatch(NON_USTED_WORDS_PATTERN);
    }
  );
});

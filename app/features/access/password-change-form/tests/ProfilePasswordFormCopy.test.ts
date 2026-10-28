import { describe, expect, it } from "vitest";
import { PROFILE_PASSWORD_FORM_COPY } from "../constants/ProfilePasswordFormCopy.constants";
import { PROFILE_PASSWORD_FORM_METADATA } from "../constants/ProfilePasswordFormMetadata.constants";
import { NON_USTED_WORDS_PATTERN } from "./FirstSignInErrorCopy.constants";
import { TEMPORARY_WORD_PATTERN } from "./ProfilePasswordCopy.constants";

describe("profile password form copy", () => {
  it.each(Object.entries(PROFILE_PASSWORD_FORM_COPY))(
    "has non-empty usted copy for %s",
    (_key, text) => {
      expect(text).not.toBe("");
      expect(text).not.toMatch(NON_USTED_WORDS_PATTERN);
      expect(text).not.toMatch(TEMPORARY_WORD_PATTERN);
    }
  );

  it("titles the page with its metadata title", () => {
    expect(PROFILE_PASSWORD_FORM_METADATA.title).toBe(
      PROFILE_PASSWORD_FORM_COPY.METADATA_TITLE
    );
  });
});

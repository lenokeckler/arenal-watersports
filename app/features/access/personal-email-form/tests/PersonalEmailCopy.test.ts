import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_ERROR_CODE } from "@/app/constants";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import { PERSONAL_EMAIL_FORM_METADATA } from "../constants/PersonalEmailFormMetadata.constants";
import {
  ALL_COPY,
  TUTEO_SAMPLES,
  TUTEO_WORDS_PATTERN,
  VOSEO_SAMPLES,
  VOSEO_WORDS_PATTERN,
} from "./PersonalEmailCopy.constants";

describe("personal email copy", () => {
  it.each(ALL_COPY)(
    "has non-empty usted copy for %s",
    (_key, text) => {
      expect(text.trim()).not.toBe("");
      expect(text).not.toMatch(VOSEO_WORDS_PATTERN);
      expect(text).not.toMatch(TUTEO_WORDS_PATTERN);
    }
  );

  it.each(Object.values(PERSONAL_EMAIL_ERROR_CODE))(
    "has an error text for %s",
    (code) => {
      expect(PERSONAL_EMAIL_ERROR_COPY[code]).toBeTruthy();
    }
  );

  it.each(VOSEO_SAMPLES)(
    "detects the voseo in %s",
    (text) => {
      expect(text).toMatch(VOSEO_WORDS_PATTERN);
    }
  );

  it.each(TUTEO_SAMPLES)(
    "detects the tuteo in %s",
    (text) => {
      expect(text).toMatch(TUTEO_WORDS_PATTERN);
    }
  );

  it("titles the page with its metadata title", () => {
    expect(PERSONAL_EMAIL_FORM_METADATA.title).toBe(
      PERSONAL_EMAIL_FORM_COPY.METADATA_TITLE
    );
  });
});

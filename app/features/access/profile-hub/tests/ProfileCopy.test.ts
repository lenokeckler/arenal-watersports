import { describe, expect, it } from "vitest";
import {
  TUTEO_WORDS_PATTERN,
  VOSEO_WORDS_PATTERN,
} from "@/app/utils/copy/tests/ustedCopyPatterns";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import { PROFILE_METADATA } from "../constants/ProfileMetadata.constants";

describe("profile hub copy", () => {
  it.each(Object.entries(PROFILE_COPY))(
    "has non-empty copy for %s",
    (_key, text) => {
      expect(text.trim()).not.toBe("");
      expect(text).not.toMatch(VOSEO_WORDS_PATTERN);
      expect(text).not.toMatch(TUTEO_WORDS_PATTERN);
    }
  );

  it("titles the page with its metadata title", () => {
    expect(PROFILE_METADATA.title).toBe(
      PROFILE_COPY.METADATA_TITLE
    );
  });
});

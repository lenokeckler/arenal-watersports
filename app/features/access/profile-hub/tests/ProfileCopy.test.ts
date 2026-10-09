import { describe, expect, it } from "vitest";
import { PROFILE_COPY } from "../constants/ProfileCopy.constants";
import { PROFILE_METADATA } from "../constants/ProfileMetadata.constants";

describe("profile hub copy", () => {
  it.each(Object.entries(PROFILE_COPY))(
    "has non-empty copy for %s",
    (_key, text) => {
      expect(text.trim()).not.toBe("");
    }
  );

  it("titles the page with its metadata title", () => {
    expect(PROFILE_METADATA.title).toBe(
      PROFILE_COPY.METADATA_TITLE
    );
  });
});

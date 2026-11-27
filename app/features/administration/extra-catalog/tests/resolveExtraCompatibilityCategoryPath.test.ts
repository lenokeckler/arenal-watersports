import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { resolveExtraCompatibilityCategoryPath } from "../utils/resolveExtraCompatibilityCategoryPath";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import {
  FAKE_EXTRA_ID,
  UNSAFE_EXTRA_ID,
} from "./Extra.constants";
import { COMPATIBILITY_CATEGORY_ID } from "./ExtraCompatibility.constants";

describe("resolveExtraCompatibilityCategoryPath", () => {
  it("appends the category id to the compatibility path of the extra", () => {
    expect(
      resolveExtraCompatibilityCategoryPath(
        FAKE_EXTRA_ID,
        COMPATIBILITY_CATEGORY_ID
      )
    ).toBe(
      [
        resolveExtraCompatibilityPath(FAKE_EXTRA_ID),
        COMPATIBILITY_CATEGORY_ID,
      ].join(STRING.SLASH)
    );
  });

  it("encodes a category id that is not url safe", () => {
    expect(
      resolveExtraCompatibilityCategoryPath(
        FAKE_EXTRA_ID,
        UNSAFE_EXTRA_ID
      )
    ).toBe(
      [
        resolveExtraCompatibilityPath(FAKE_EXTRA_ID),
        encodeURIComponent(UNSAFE_EXTRA_ID),
      ].join(STRING.SLASH)
    );
  });
});

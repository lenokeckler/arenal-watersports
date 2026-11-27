import { describe, expect, it } from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import {
  FAKE_EXTRA_ID,
  UNSAFE_EXTRA_ID,
} from "./Extra.constants";

describe("resolveExtraCompatibilityPath", () => {
  it("appends the compatibility segment to the extra path", () => {
    expect(
      resolveExtraCompatibilityPath(FAKE_EXTRA_ID)
    ).toBe(
      [
        PATHS.ADMINISTRATION.EXTRAS,
        FAKE_EXTRA_ID,
        PATHS.ADMINISTRATION.EXTRA_COMPATIBILITY_SEGMENT,
      ].join(STRING.SLASH)
    );
  });

  it("encodes an id that is not url safe", () => {
    expect(
      resolveExtraCompatibilityPath(UNSAFE_EXTRA_ID)
    ).toBe(
      [
        PATHS.ADMINISTRATION.EXTRAS,
        encodeURIComponent(UNSAFE_EXTRA_ID),
        PATHS.ADMINISTRATION.EXTRA_COMPATIBILITY_SEGMENT,
      ].join(STRING.SLASH)
    );
  });
});

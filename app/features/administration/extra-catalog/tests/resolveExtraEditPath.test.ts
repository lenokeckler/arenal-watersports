import { describe, expect, it } from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { resolveExtraEditPath } from "../utils/resolveExtraEditPath";
import {
  FAKE_EXTRA_ID,
  UNSAFE_EXTRA_ID,
} from "./Extra.constants";

describe("resolveExtraEditPath", () => {
  it("appends the extra id to the extras list path", () => {
    expect(resolveExtraEditPath(FAKE_EXTRA_ID)).toBe(
      [PATHS.ADMINISTRATION.EXTRAS, FAKE_EXTRA_ID].join(
        STRING.SLASH
      )
    );
  });

  it("encodes an id that is not url safe", () => {
    expect(resolveExtraEditPath(UNSAFE_EXTRA_ID)).toBe(
      [
        PATHS.ADMINISTRATION.EXTRAS,
        encodeURIComponent(UNSAFE_EXTRA_ID),
      ].join(STRING.SLASH)
    );
  });
});

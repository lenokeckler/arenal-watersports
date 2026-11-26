import { describe, expect, it } from "vitest";
import { PATHS, STRING } from "@/app/constants";
import { resolveComboEditPath } from "../utils/resolveComboEditPath";
import {
  FAKE_COMBO_ID,
  UNSAFE_COMBO_ID,
} from "./Combo.constants";

describe("resolveComboEditPath", () => {
  it("appends the combo id to the combos list path", () => {
    expect(resolveComboEditPath(FAKE_COMBO_ID)).toBe(
      [PATHS.ADMINISTRATION.COMBOS, FAKE_COMBO_ID].join(
        STRING.SLASH
      )
    );
  });

  it("encodes an id that is not url safe", () => {
    expect(resolveComboEditPath(UNSAFE_COMBO_ID)).toBe(
      [
        PATHS.ADMINISTRATION.COMBOS,
        encodeURIComponent(UNSAFE_COMBO_ID),
      ].join(STRING.SLASH)
    );
  });
});

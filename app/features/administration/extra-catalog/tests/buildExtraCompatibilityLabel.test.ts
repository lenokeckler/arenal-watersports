import { describe, expect, it } from "vitest";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { buildExtraCompatibilityLabel } from "../utils/buildExtraCompatibilityLabel";
import { FAKE_EXTRA_COMPATIBLE_UNIT_COUNT } from "./Extra.constants";

describe("buildExtraCompatibilityLabel", () => {
  it("says the extra has no units when none is linked", () => {
    expect(buildExtraCompatibilityLabel(0)).toBe(
      EXTRA_COMPATIBILITY_COPY.NO_UNITS
    );
  });

  it("uses the singular for one linked unit", () => {
    expect(buildExtraCompatibilityLabel(1)).toBe(
      EXTRA_COMPATIBILITY_COPY.APPLIES_TO_ONE_UNIT
    );
  });

  it("states the count for several linked units", () => {
    expect(
      buildExtraCompatibilityLabel(
        FAKE_EXTRA_COMPATIBLE_UNIT_COUNT
      )
    ).toBe(
      EXTRA_COMPATIBILITY_COPY.APPLIES_TO_UNITS(
        FAKE_EXTRA_COMPATIBLE_UNIT_COUNT
      )
    );
  });
});

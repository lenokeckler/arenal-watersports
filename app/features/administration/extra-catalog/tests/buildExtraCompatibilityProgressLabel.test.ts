import { describe, expect, it } from "vitest";
import { LENGTH } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { buildExtraCompatibilityProgressLabel } from "../utils/buildExtraCompatibilityProgressLabel";
import {
  LINKED_CATEGORY_LINKED_COUNT,
  LINKED_CATEGORY_UNIT_COUNT,
} from "./ExtraCompatibility.constants";

describe("buildExtraCompatibilityProgressLabel", () => {
  it("states the linked units out of the units of the category", () => {
    expect(
      buildExtraCompatibilityProgressLabel(
        LINKED_CATEGORY_LINKED_COUNT,
        LINKED_CATEGORY_UNIT_COUNT
      )
    ).toBe(
      EXTRA_COMPATIBILITY_COPY.LINKED_OF_UNITS(
        LINKED_CATEGORY_LINKED_COUNT,
        LINKED_CATEGORY_UNIT_COUNT
      )
    );
  });

  it("uses the singular for a category with one unit", () => {
    expect(
      buildExtraCompatibilityProgressLabel(
        LENGTH.ONE,
        LENGTH.ONE
      )
    ).toBe(
      EXTRA_COMPATIBILITY_COPY.LINKED_OF_ONE_UNIT(
        LENGTH.ONE
      )
    );
  });

  it("counts zero linked units", () => {
    expect(
      buildExtraCompatibilityProgressLabel(
        LENGTH.ZERO,
        LINKED_CATEGORY_UNIT_COUNT
      )
    ).toBe(
      EXTRA_COMPATIBILITY_COPY.LINKED_OF_UNITS(
        LENGTH.ZERO,
        LINKED_CATEGORY_UNIT_COUNT
      )
    );
  });
});

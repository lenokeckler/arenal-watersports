import { describe, expect, it } from "vitest";
import { buildExtraCompatibilityUnits } from "../utils/buildExtraCompatibilityUnits";
import {
  COMPATIBILITY_CATEGORY_ROW,
  FREE_UNIT_ROW,
  LINKED_UNIT_ID,
  LINKED_UNIT_ROW,
} from "./ExtraCompatibility.constants";

describe("buildExtraCompatibilityUnits", () => {
  it("marks the linked units and leaves the decommissioned ones out", () => {
    expect(
      buildExtraCompatibilityUnits(
        COMPATIBILITY_CATEGORY_ROW.equipment_units,
        new Set([LINKED_UNIT_ID])
      )
    ).toEqual([
      { ...LINKED_UNIT_ROW, isLinked: true },
      { ...FREE_UNIT_ROW, isLinked: false },
    ]);
  });
});

import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { canEditUnitsAreInterchangeable } from "../utils/canEditUnitsAreInterchangeable";

const CAN_EDIT_BY_TRACKING_MODE: [
  CategoryTrackingMode,
  boolean,
][] = [
  [CATEGORY_TRACKING_MODE.BY_UNIT, true],
  [CATEGORY_TRACKING_MODE.BY_QUANTITY, false],
];

describe("canEditUnitsAreInterchangeable", () => {
  it.each(CAN_EDIT_BY_TRACKING_MODE)(
    "for %s answers %s",
    (trackingMode, expected) => {
      expect(
        canEditUnitsAreInterchangeable(trackingMode)
      ).toBe(expected);
    }
  );
});

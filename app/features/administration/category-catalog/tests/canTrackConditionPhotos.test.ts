import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { canTrackConditionPhotos } from "../utils/canTrackConditionPhotos";

const CAN_TRACK_BY_TRACKING_MODE: [
  CategoryTrackingMode,
  boolean,
][] = [
  [CATEGORY_TRACKING_MODE.BY_UNIT, true],
  [CATEGORY_TRACKING_MODE.BY_QUANTITY, false],
];

describe("canTrackConditionPhotos", () => {
  it.each(CAN_TRACK_BY_TRACKING_MODE)(
    "for %s answers %s",
    (trackingMode, expected) => {
      expect(canTrackConditionPhotos(trackingMode)).toBe(
        expected
      );
    }
  );
});

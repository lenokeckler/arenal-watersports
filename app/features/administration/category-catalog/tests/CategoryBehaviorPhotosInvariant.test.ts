import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { applyHasConditionPhotosChange } from "../utils/applyHasConditionPhotosChange";
import { canTrackConditionPhotos } from "../utils/canTrackConditionPhotos";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import type { LabeledCase } from "./models/LabeledCase.type";
import type { PhotosScenario } from "./models/PhotosScenario.interface";

const PHOTOS_SCENARIOS: LabeledCase<PhotosScenario>[] = [
  [
    "by unit, flag off, turn on",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      startingFlag: false,
      requestedFlag: true,
    },
  ],
  [
    "by unit, flag off, turn off",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      startingFlag: false,
      requestedFlag: false,
    },
  ],
  [
    "by unit, flag on, turn on",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      startingFlag: true,
      requestedFlag: true,
    },
  ],
  [
    "by unit, flag on, turn off",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      startingFlag: true,
      requestedFlag: false,
    },
  ],
  [
    "by quantity, flag off, turn on",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      startingFlag: false,
      requestedFlag: true,
    },
  ],
  [
    "by quantity, flag off, turn off",
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      startingFlag: false,
      requestedFlag: false,
    },
  ],
];

describe("category photos invariant", () => {
  it.each(PHOTOS_SCENARIOS)(
    "never leaves photos without unit tracking: %s",
    (_scenarioName, scenario) => {
      const values = applyHasConditionPhotosChange(
        {
          ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
          hasConditionPhotos: scenario.startingFlag,
        },
        scenario.requestedFlag,
        scenario.trackingMode
      );

      expect(
        !values.hasConditionPhotos ||
          canTrackConditionPhotos(scenario.trackingMode)
      ).toBe(true);
    }
  );
});

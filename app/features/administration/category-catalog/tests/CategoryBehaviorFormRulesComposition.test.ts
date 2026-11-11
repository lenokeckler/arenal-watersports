import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";
import { applyHasConditionPhotosChange } from "../utils/applyHasConditionPhotosChange";
import { applyHasMotorChange } from "../utils/applyHasMotorChange";
import { applyUsageMetricChange } from "../utils/applyUsageMetricChange";
import { canTrackConditionPhotos } from "../utils/canTrackConditionPhotos";
import { INHERITED_PROPERTY_TEXTS } from "./CategoryBehaviorFormRules.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import type { TrackingModeFormValuesAction } from "./models/TrackingModeFormValuesAction.type";

const SEQUENCE_LENGTH = 4;

const ACTIONS: TrackingModeFormValuesAction[] = [
  (values) => applyHasMotorChange(values, true),
  (values) => applyHasMotorChange(values, false),
  (values) =>
    applyUsageMetricChange(values, USAGE_METRIC.KILOMETERS),
  (values) =>
    applyUsageMetricChange(
      values,
      USAGE_METRIC.ENGINE_HOURS
    ),
  (values) => applyUsageMetricChange(values, STRING.Empty),
  ...INHERITED_PROPERTY_TEXTS.map(
    (text): TrackingModeFormValuesAction =>
      (values) =>
        applyUsageMetricChange(values, text)
  ),
  (values, trackingMode) =>
    applyHasConditionPhotosChange(
      values,
      true,
      trackingMode
    ),
  (values, trackingMode) =>
    applyHasConditionPhotosChange(
      values,
      false,
      trackingMode
    ),
];

const STARTING_VALUES: CategoryBehaviorFormValues[] = [
  {
    ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    hasMotor: false,
    usageMetric: STRING.Empty,
  },
  VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  {
    ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    usageMetric: USAGE_METRIC.KILOMETERS,
  },
];

const buildSequences = (
  length: number
): TrackingModeFormValuesAction[][] =>
  Array.from({ length }).reduce<
    TrackingModeFormValuesAction[][]
  >(
    (sequences) =>
      sequences.flatMap((sequence) =>
        ACTIONS.map((action) => [...sequence, action])
      ),
    [[]]
  );

const holdsEveryCheck = (
  values: CategoryBehaviorFormValues,
  trackingMode: CategoryTrackingMode
): boolean => {
  const hasMetric = values.usageMetric !== STRING.Empty;
  return (
    (!values.hasMotor || hasMetric) &&
    (!hasMetric || values.hasMotor) &&
    (!values.hasConditionPhotos ||
      canTrackConditionPhotos(trackingMode))
  );
};

const countBrokenSteps = (
  sequence: TrackingModeFormValuesAction[],
  startingValues: CategoryBehaviorFormValues,
  trackingMode: CategoryTrackingMode
): number =>
  sequence.reduce(
    (state, action) => {
      const values = action(state.values, trackingMode);
      return {
        values,
        broken:
          state.broken +
          (holdsEveryCheck(values, trackingMode) ? 0 : 1),
      };
    },
    { values: startingValues, broken: 0 }
  ).broken;

describe("category behavior form rules composed", () => {
  it.each(Object.values(CATEGORY_TRACKING_MODE))(
    "keeps motor and photos checks at every step when tracking %s",
    (trackingMode) => {
      const sequences = buildSequences(SEQUENCE_LENGTH);

      const brokenSteps = STARTING_VALUES.flatMap(
        (startingValues) =>
          sequences.map((sequence) =>
            countBrokenSteps(
              sequence,
              startingValues,
              trackingMode
            )
          )
      ).reduce((total, broken) => total + broken, 0);

      expect(brokenSteps).toBe(0);
    }
  );
});

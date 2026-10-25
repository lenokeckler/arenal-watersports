import { describe, expect, it } from "vitest";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import {
  DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
  FAKE_DEFAULT_DURATION_MINUTES,
  FAKE_UPDATE_ADMIN_WORKER_ID,
} from "./UpdateCategoryBehaviorInput.constants";

describe("mapUpdateCategoryBehaviorInputToRow", () => {
  it("maps every field to its column and stamps the admin as updater", () => {
    const input = {
      ...DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
    };

    const row = mapUpdateCategoryBehaviorInputToRow(
      input,
      FAKE_UPDATE_ADMIN_WORKER_ID
    );

    expect(row).toEqual({
      is_reservable: true,
      has_motor: true,
      usage_metric: USAGE_METRIC.ENGINE_HOURS,
      consumes_fuel: true,
      can_be_damaged: true,
      has_condition_photos: false,
      guide_only: false,
      default_duration_minutes:
        FAKE_DEFAULT_DURATION_MINUTES,
      units_are_interchangeable: true,
      updated_by: FAKE_UPDATE_ADMIN_WORKER_ID,
    });
  });

  it("keeps a null usage metric and a null duration as null", () => {
    const input = {
      ...DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
      usageMetric: null,
      defaultDurationMinutes: null,
    };

    const row = mapUpdateCategoryBehaviorInputToRow(
      input,
      FAKE_UPDATE_ADMIN_WORKER_ID
    );

    expect(row.usage_metric).toBeNull();
    expect(row.default_duration_minutes).toBeNull();
  });

  it("normalizes an undefined usage metric and duration to null so the update clears them", () => {
    const input = {
      ...DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
      usageMetric: undefined,
      defaultDurationMinutes: undefined,
    };

    const row = mapUpdateCategoryBehaviorInputToRow(
      input,
      FAKE_UPDATE_ADMIN_WORKER_ID
    );

    expect(row).toHaveProperty("usage_metric", null);
    expect(row).toHaveProperty(
      "default_duration_minutes",
      null
    );
  });
});

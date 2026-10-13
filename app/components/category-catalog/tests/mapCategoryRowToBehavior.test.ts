import { describe, expect, it } from "vitest";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { mapCategoryRowToBehavior } from "../utils/mapCategoryRowToBehavior";
import { DEFAULT_EQUIPMENT_CATEGORY_ROW } from "./EquipmentCategoryRow.constants";

describe("mapCategoryRowToBehavior", () => {
  it("maps every behavior field straight from the row", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      is_reservable: true,
      has_motor: true,
      usage_metric: USAGE_METRIC.ENGINE_HOURS,
      consumes_fuel: true,
      can_be_damaged: true,
      has_condition_photos: true,
      guide_only: true,
      default_duration_minutes: 60,
      units_are_interchangeable: true,
    };

    const categoryBehavior =
      mapCategoryRowToBehavior(categoryRow);

    expect(categoryBehavior).toEqual({
      id: categoryRow.id,
      trackingMode: categoryRow.tracking_mode,
      isReservable: true,
      hasMotor: true,
      usageMetric: USAGE_METRIC.ENGINE_HOURS,
      consumesFuel: true,
      canBeDamaged: true,
      hasConditionPhotos: true,
      guideOnly: true,
      defaultDurationMinutes: 60,
      unitsAreInterchangeable: true,
    });
  });

  it("maps a null usage metric to no metric", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      usage_metric: null,
    };

    const categoryBehavior =
      mapCategoryRowToBehavior(categoryRow);

    expect(categoryBehavior.usageMetric).toBeNull();
  });

  it("maps a null default duration to no duration", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      default_duration_minutes: null,
    };

    const categoryBehavior =
      mapCategoryRowToBehavior(categoryRow);

    expect(
      categoryBehavior.defaultDurationMinutes
    ).toBeNull();
  });

  it("maps each boolean field to its own behavior field without swapping them", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      is_reservable: false,
      has_motor: true,
      consumes_fuel: false,
      can_be_damaged: true,
      has_condition_photos: false,
      guide_only: true,
      units_are_interchangeable: false,
    };

    const categoryBehavior =
      mapCategoryRowToBehavior(categoryRow);

    expect(categoryBehavior.isReservable).toBe(false);
    expect(categoryBehavior.hasMotor).toBe(true);
    expect(categoryBehavior.consumesFuel).toBe(false);
    expect(categoryBehavior.canBeDamaged).toBe(true);
    expect(categoryBehavior.hasConditionPhotos).toBe(false);
    expect(categoryBehavior.guideOnly).toBe(true);
    expect(categoryBehavior.unitsAreInterchangeable).toBe(
      false
    );
  });

  it("maps a kilometers usage metric straight through", () => {
    const categoryRow = {
      ...DEFAULT_EQUIPMENT_CATEGORY_ROW,
      usage_metric: USAGE_METRIC.KILOMETERS,
    };

    const categoryBehavior =
      mapCategoryRowToBehavior(categoryRow);

    expect(categoryBehavior.usageMetric).toBe(
      USAGE_METRIC.KILOMETERS
    );
  });
});

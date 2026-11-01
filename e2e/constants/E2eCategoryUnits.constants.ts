import { STRING } from "@/app/constants";
import { CATEGORY_TRACKING_MODE } from "@/app/features/administration/category-catalog/constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "@/app/features/administration/category-catalog/constants/UsageMetric.constants";
import {
  UNIT_STATUS,
  type UnitStatus,
} from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import type { CategoryFixtureBehavior } from "../models/CategoryFixtureBehavior.interface";
import type { UnitFormInput } from "../models/UnitFormInput.interface";

export const E2E_CATEGORY_UNITS_SCREENSHOT_BASENAME =
  "us-adm-16-category-units";

export const E2E_CATEGORY_UNITS_SCREENSHOT_STATE = {
  CREATE_ERROR: "create-error",
  DECOMMISSION: "decommission",
  LIST: "list",
} as const;

export const resolveCategoryUnitsScreenshotBasename = (
  state: string
): string =>
  `${E2E_CATEGORY_UNITS_SCREENSHOT_BASENAME}-${state}`;

export const E2E_CATEGORY_UNITS_BASE_NAME =
  "E2E Fixture — Unidades";

export const resolveCategoryUnitsFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_UNITS_BASE_NAME} (${projectName} · ${scenario})`;

export const resolveUnitFixtureCode = (
  projectName: string,
  scenario: string,
  suffix: string = STRING.Empty
): string => `E2E ${scenario}${suffix} ${projectName}`;

export const E2E_MOTORIZED_CATEGORY: Partial<CategoryFixtureBehavior> =
  {
    hasMotor: true,
    usageMetric: USAGE_METRIC.ENGINE_HOURS,
  };

export const E2E_BY_QUANTITY_CATEGORY: Partial<CategoryFixtureBehavior> =
  { trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY };

export const E2E_UNIT_DEFAULT_INPUT: UnitFormInput = {
  code: "",
  fuelLevel: "",
  fuelMax: "4",
  nextOilChangeAt: "",
  usageTotal: "",
};

export const E2E_UNIT_MOTOR_INPUT: Partial<UnitFormInput> =
  {
    nextOilChangeAt: "50",
    usageTotal: "12.5",
  };

export const E2E_UNIT_STORED = {
  FUEL_MAX: 4,
  NEXT_OIL_CHANGE_AT: 50,
  USAGE_TOTAL: 12.5,
} as const;

export const E2E_UNIT_DIMMED_OPACITY = "0.7";

export const E2E_UNIT_ZERO_READING = "0";

export const E2E_UNIT_DECOMMISSION_REASON = "Casco partido";

export const E2E_UNIT_SCREENSHOT_STATUSES: UnitStatus[] = [
  UNIT_STATUS.AVAILABLE,
  UNIT_STATUS.IN_MAINTENANCE,
  UNIT_STATUS.DECOMMISSIONED,
];

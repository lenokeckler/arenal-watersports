import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { UNIT_CATEGORY_TRACKING_MODE } from "../constants/UnitCategoryTrackingMode.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { UNIT_USAGE_METRIC } from "../constants/UnitUsageMetric.constants";
import type { UnitCategory } from "../models/UnitCategory.interface";
import type { UnitCategoryRow } from "../models/UnitCategoryRow.type";
import type { UnitListItem } from "../models/UnitListItem.interface";
import type { UnitListRow } from "../models/UnitListRow.type";
import { resolveCategoryUnitsPath } from "../utils/resolveUnitPaths";
import {
  DEFAULT_UNIT_ROW,
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

export const FAKE_CATEGORY_NAME = "Jet ski";
export const LAST_PAGE_COUNT = 2;
export const MIDDLE_PAGE = 2;
export const MIDDLE_PAGE_COUNT = 3;
export const LAST_PAGE_HREF = resolveListPageHref(
  resolveCategoryUnitsPath(FAKE_CATEGORY_ID),
  LAST_PAGE_COUNT
);
export const NOT_FOUND_ERROR_MESSAGE = "NEXT_NOT_FOUND";
export const PAGE_PAST_THE_END = "9";
export const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";

export const throwNavigation = (message: string) => () => {
  throw new Error(message);
};

export const DEFAULT_UNIT_CATEGORY_ROW: UnitCategoryRow = {
  id: FAKE_CATEGORY_ID,
  name: FAKE_CATEGORY_NAME,
  tracking_mode: UNIT_CATEGORY_TRACKING_MODE.BY_UNIT,
  has_motor: true,
  usage_metric: UNIT_USAGE_METRIC.ENGINE_HOURS,
};

export const DEFAULT_UNIT_CATEGORY: UnitCategory = {
  id: FAKE_CATEGORY_ID,
  name: FAKE_CATEGORY_NAME,
  trackingMode: UNIT_CATEGORY_TRACKING_MODE.BY_UNIT,
  hasMotor: true,
  usageMetric: UNIT_USAGE_METRIC.ENGINE_HOURS,
};

export const DEFAULT_UNIT_LIST_ROW: UnitListRow = {
  id: FAKE_UNIT_ID,
  code: DEFAULT_UNIT_ROW.code,
  status: UNIT_STATUS.AVAILABLE,
  fuel_max: DEFAULT_UNIT_ROW.fuel_max,
  fuel_level: DEFAULT_UNIT_ROW.fuel_level,
  usage_total: DEFAULT_UNIT_ROW.usage_total,
  next_oil_change_at: DEFAULT_UNIT_ROW.next_oil_change_at,
};

export const DEFAULT_UNIT_LIST_ITEM: UnitListItem = {
  id: FAKE_UNIT_ID,
  code: DEFAULT_UNIT_ROW.code,
  recordedStatus: UNIT_STATUS.AVAILABLE,
  effectiveStatus: UNIT_STATUS.AVAILABLE,
  fuelLevel: DEFAULT_UNIT_ROW.fuel_level,
  fuelMax: DEFAULT_UNIT_ROW.fuel_max,
  usageTotal: DEFAULT_UNIT_ROW.usage_total,
  nextOilChangeAt: DEFAULT_UNIT_ROW.next_oil_change_at,
  decommissioned: false,
};

export const buildUnitCategory = (
  overrides: Partial<UnitCategory> = {}
): UnitCategory => ({
  ...DEFAULT_UNIT_CATEGORY,
  ...overrides,
});

export const buildUnitListItem = (
  overrides: Partial<UnitListItem> = {}
): UnitListItem => ({
  ...DEFAULT_UNIT_LIST_ITEM,
  ...overrides,
});

export const buildUnitListRow = (
  overrides: Partial<UnitListRow> = {}
): UnitListRow => ({
  ...DEFAULT_UNIT_LIST_ROW,
  ...overrides,
});

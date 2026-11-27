import {
  INVENTORY_UNIT_STATUS,
  LENGTH,
} from "@/app/constants";
import type { ExtraCompatibilityCategories } from "../models/ExtraCompatibilityCategories.interface";
import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilityCategoryRow } from "../models/ExtraCompatibilityCategoryRow.type";
import type { ExtraCompatibilityReference } from "../models/ExtraCompatibilityReference.interface";
import type { ExtraCompatibilityUnit } from "../models/ExtraCompatibilityUnit.interface";
import type { ExtraCompatibilityUnitRow } from "../models/ExtraCompatibilityUnitRow.type";
import type { ExtraCompatibilityUnits } from "../models/ExtraCompatibilityUnits.interface";
import { FAKE_EXTRA_NAME } from "./Extra.constants";

export const COMPATIBILITY_EXTRA_ID =
  "11111111-1111-4111-8111-111111111111";
export const COMPATIBILITY_CATEGORY_ID =
  "22222222-2222-4222-8222-222222222222";
export const OTHER_COMPATIBILITY_CATEGORY_ID =
  "33333333-3333-4333-8333-333333333333";
export const LINKED_UNIT_ID =
  "44444444-4444-4444-8444-444444444441";
export const FREE_UNIT_ID =
  "44444444-4444-4444-8444-444444444442";
export const DECOMMISSIONED_UNIT_ID =
  "44444444-4444-4444-8444-444444444443";
export const OTHER_CATEGORY_UNIT_ID =
  "44444444-4444-4444-8444-444444444444";
export const COMPATIBILITY_CATEGORY_NAME = "Lancha";
export const EXTRA_COMPATIBILITY_TABLE =
  "extra_compatibility";
export const EXTRA_ID_FOREIGN_COLUMN = "extra_id";
export const EQUIPMENT_CATEGORIES_TABLE =
  "equipment_categories";
export const TRACKING_MODE_COLUMN = "tracking_mode";
export const CATEGORY_STATUS_COLUMN = "status";
export const CATEGORY_NAME_COLUMN = "name";
export const UNIT_CODE_COLUMN = "code";

export const COMPATIBILITY_EXTRA: ExtraCompatibilityReference =
  { id: COMPATIBILITY_EXTRA_ID, name: FAKE_EXTRA_NAME };

export const LINKED_UNIT_ROW: ExtraCompatibilityUnitRow = {
  id: LINKED_UNIT_ID,
  code: "LA-01",
  status: INVENTORY_UNIT_STATUS.AVAILABLE,
};

export const FREE_UNIT_ROW: ExtraCompatibilityUnitRow = {
  id: FREE_UNIT_ID,
  code: "LA-02",
  status: INVENTORY_UNIT_STATUS.DAMAGED,
};

export const DECOMMISSIONED_UNIT_ROW: ExtraCompatibilityUnitRow =
  {
    id: DECOMMISSIONED_UNIT_ID,
    code: "LA-03",
    status: INVENTORY_UNIT_STATUS.DECOMMISSIONED,
  };

export const COMPATIBILITY_CATEGORY_ROW: ExtraCompatibilityCategoryRow =
  {
    id: COMPATIBILITY_CATEGORY_ID,
    name: COMPATIBILITY_CATEGORY_NAME,
    equipment_units: [
      LINKED_UNIT_ROW,
      FREE_UNIT_ROW,
      DECOMMISSIONED_UNIT_ROW,
    ],
  };

export const EMPTY_COMPATIBILITY_CATEGORY_ROW: ExtraCompatibilityCategoryRow =
  {
    id: OTHER_COMPATIBILITY_CATEGORY_ID,
    name: "Kayak",
    equipment_units: [DECOMMISSIONED_UNIT_ROW],
  };

export const SINGLE_UNIT_CATEGORY_NAME = "Kayak";
export const LINKED_CATEGORY_UNIT_COUNT = 3;
export const LINKED_CATEGORY_LINKED_COUNT = 2;

export const OTHER_CATEGORY_UNIT_CODE = "KA-01";

export const COMPATIBILITY_CATEGORY_SUMMARY: ExtraCompatibilityCategory =
  {
    id: COMPATIBILITY_CATEGORY_ID,
    name: COMPATIBILITY_CATEGORY_NAME,
    unitCount: LENGTH.TWO,
    linkedUnitCount: LENGTH.ONE,
    units: [
      { ...LINKED_UNIT_ROW, isLinked: true },
      { ...FREE_UNIT_ROW, isLinked: false },
    ],
  };

export const SINGLE_UNIT_CATEGORY_SUMMARY: ExtraCompatibilityCategory =
  {
    id: OTHER_COMPATIBILITY_CATEGORY_ID,
    name: SINGLE_UNIT_CATEGORY_NAME,
    unitCount: LENGTH.ONE,
    linkedUnitCount: LENGTH.ZERO,
    units: [
      {
        id: OTHER_CATEGORY_UNIT_ID,
        code: OTHER_CATEGORY_UNIT_CODE,
        status: INVENTORY_UNIT_STATUS.AVAILABLE,
        isLinked: false,
      },
    ],
  };

export const COMPATIBILITY_CATEGORIES: ExtraCompatibilityCategories =
  {
    extra: COMPATIBILITY_EXTRA,
    categories: [
      COMPATIBILITY_CATEGORY_SUMMARY,
      SINGLE_UNIT_CATEGORY_SUMMARY,
    ],
  };

export const NO_COMPATIBILITY_CATEGORIES: ExtraCompatibilityCategories =
  { extra: COMPATIBILITY_EXTRA, categories: [] };

export const LINKED_COMPATIBILITY_UNIT: ExtraCompatibilityUnit =
  { ...LINKED_UNIT_ROW, isLinked: true };

export const FREE_COMPATIBILITY_UNIT: ExtraCompatibilityUnit =
  { ...FREE_UNIT_ROW, isLinked: false };

export const COMPATIBILITY_UNITS: ExtraCompatibilityUnits =
  {
    extra: COMPATIBILITY_EXTRA,
    category: {
      id: COMPATIBILITY_CATEGORY_ID,
      name: COMPATIBILITY_CATEGORY_NAME,
    },
    units: [
      LINKED_COMPATIBILITY_UNIT,
      FREE_COMPATIBILITY_UNIT,
    ],
  };

export const EMPTY_COMPATIBILITY_UNITS: ExtraCompatibilityUnits =
  { ...COMPATIBILITY_UNITS, units: [] };

import type { CategoryListSources } from "../models/CategoryListSources.interface";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

export const DEFAULT_CATEGORY_QUANTITY = 6;

export const DEFAULT_CATEGORY_LIST_SOURCES: CategoryListSources =
  {
    categoryIdsWithRecords: new Set(),
    quantityByCategoryId: new Map([
      [FAKE_CATEGORY_ID, DEFAULT_CATEGORY_QUANTITY],
    ]),
  };

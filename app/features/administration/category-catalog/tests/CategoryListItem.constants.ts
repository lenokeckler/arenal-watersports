import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { mapCategoryRowToListItem } from "../utils/mapCategoryRowToListItem";
import { DEFAULT_CATEGORY_LIST_SOURCES } from "./CategoryListSources.constants";
import { DEFAULT_EQUIPMENT_CATEGORY_ROW } from "./EquipmentCategoryRow.constants";

export const DEFAULT_CATEGORY_LIST_ITEM: CategoryListItem =
  mapCategoryRowToListItem(
    DEFAULT_EQUIPMENT_CATEGORY_ROW,
    DEFAULT_CATEGORY_LIST_SOURCES
  );

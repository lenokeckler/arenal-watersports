import { COMBO_CATEGORY_OPTIONS_FILTER } from "../constants/ComboCategoryOptionsFilter.constants";

export const buildComboCategoryOptionsFilter = (
  selectedCategoryIds: string[]
): string => {
  if (selectedCategoryIds.length === 0) {
    return COMBO_CATEGORY_OPTIONS_FILTER.RESERVABLE_ACTIVE;
  }

  return [
    COMBO_CATEGORY_OPTIONS_FILTER.RESERVABLE_ACTIVE,
    `${COMBO_CATEGORY_OPTIONS_FILTER.SELECTED_PREFIX}${selectedCategoryIds.join(COMBO_CATEGORY_OPTIONS_FILTER.FILTER_SEPARATOR)}${COMBO_CATEGORY_OPTIONS_FILTER.SELECTED_SUFFIX}`,
  ].join(COMBO_CATEGORY_OPTIONS_FILTER.FILTER_SEPARATOR);
};

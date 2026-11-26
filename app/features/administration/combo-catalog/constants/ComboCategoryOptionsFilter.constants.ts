import { COMBO_STATUS } from "./ComboStatus.constants";

export const COMBO_CATEGORY_OPTIONS_FILTER = {
  FILTER_SEPARATOR: ",",
  RESERVABLE_ACTIVE: `and(status.eq.${COMBO_STATUS.ACTIVE},is_reservable.eq.true)`,
  SELECTED_PREFIX: "id.in.(",
  SELECTED_SUFFIX: ")",
} as const;

import type { CATEGORY_UNIT_UPDATE_STATUS } from "../constants/CategoryUnits.constants";

export interface BoardUnitUpdateResult {
  status: (typeof CATEGORY_UNIT_UPDATE_STATUS)[keyof typeof CATEGORY_UNIT_UPDATE_STATUS];
}

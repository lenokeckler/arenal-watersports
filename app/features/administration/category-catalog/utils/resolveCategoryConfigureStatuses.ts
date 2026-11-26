import { CATEGORY_CONFIGURE_STATUS } from "../constants/CategoryConfigureStatus.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureStatus } from "../models/CategoryConfigureStatus.type";

export const resolveCategoryConfigureStatuses = ({
  behavior,
  status,
}: CategoryConfiguration): CategoryConfigureStatus[] => {
  if (status === CATEGORY_STATUS.INACTIVE) {
    return [CATEGORY_CONFIGURE_STATUS.INACTIVE];
  }
  if (!behavior.isReservable) {
    return [CATEGORY_CONFIGURE_STATUS.INVENTORY_ONLY];
  }
  if (behavior.guideOnly) {
    return [
      CATEGORY_CONFIGURE_STATUS.ON_BOARD,
      CATEGORY_CONFIGURE_STATUS.GUIDE_ONLY,
    ];
  }

  return [CATEGORY_CONFIGURE_STATUS.ON_BOARD];
};

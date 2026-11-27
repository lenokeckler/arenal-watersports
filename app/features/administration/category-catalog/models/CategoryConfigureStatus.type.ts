import { CATEGORY_CONFIGURE_STATUS } from "../constants/CategoryConfigureStatus.constants";

export type CategoryConfigureStatus =
  (typeof CATEGORY_CONFIGURE_STATUS)[keyof typeof CATEGORY_CONFIGURE_STATUS];

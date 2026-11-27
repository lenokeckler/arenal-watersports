import type { CategoryConfigureStatus } from "../models/CategoryConfigureStatus.type";
import type { CategoryConfigureTone } from "../models/CategoryConfigureTone.type";
import { CATEGORY_CONFIGURE_STATUS } from "./CategoryConfigureStatus.constants";
import { CATEGORY_CONFIGURE_TONE } from "./CategoryConfigureTone.constants";

export const CATEGORY_CONFIGURE_STATUS_TONE: Record<
  CategoryConfigureStatus,
  CategoryConfigureTone
> = {
  [CATEGORY_CONFIGURE_STATUS.GUIDE_ONLY]:
    CATEGORY_CONFIGURE_TONE.INFO,
  [CATEGORY_CONFIGURE_STATUS.INACTIVE]:
    CATEGORY_CONFIGURE_TONE.ERROR,
  [CATEGORY_CONFIGURE_STATUS.INVENTORY_ONLY]:
    CATEGORY_CONFIGURE_TONE.NEUTRAL,
  [CATEGORY_CONFIGURE_STATUS.ON_BOARD]:
    CATEGORY_CONFIGURE_TONE.SUCCESS,
};

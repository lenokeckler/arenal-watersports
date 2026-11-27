import type { CategoryConfigureNextStepId } from "../models/CategoryConfigureNextStepId.type";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "./CategoryConfigureNextStepId.constants";
import { CATEGORY_CONFIGURE_SECTION_ID } from "./CategoryConfigureSectionId.constants";

export const CATEGORY_CONFIGURE_NEXT_STEP_SECTION: Record<
  CategoryConfigureNextStepId,
  CategoryConfigureSectionId
> = {
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.DEPOSIT]:
    CATEGORY_CONFIGURE_SECTION_ID.DEPOSIT,
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.DURATION]:
    CATEGORY_CONFIGURE_SECTION_ID.RESERVATIONS,
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.PHOTO]:
    CATEGORY_CONFIGURE_SECTION_ID.PHOTO,
  [CATEGORY_CONFIGURE_NEXT_STEP_ID.STOCK]:
    CATEGORY_CONFIGURE_SECTION_ID.INVENTORY,
};

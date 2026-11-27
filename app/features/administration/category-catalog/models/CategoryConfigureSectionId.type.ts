import { CATEGORY_CONFIGURE_SECTION_ID } from "../constants/CategoryConfigureSectionId.constants";

export type CategoryConfigureSectionId =
  (typeof CATEGORY_CONFIGURE_SECTION_ID)[keyof typeof CATEGORY_CONFIGURE_SECTION_ID];

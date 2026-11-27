import { STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_SECTION_ANCHOR_ID_PREFIX } from "../constants/CategoryConfigureSectionAnchor.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";

export const resolveCategoryConfigureSectionAnchorId = (
  sectionId: CategoryConfigureSectionId
): string =>
  [
    CATEGORY_CONFIGURE_SECTION_ANCHOR_ID_PREFIX,
    sectionId,
  ].join(STRING.DASH);

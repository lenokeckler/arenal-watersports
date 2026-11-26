import { STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_PANEL_ID_PREFIX } from "../constants/CategoryConfigurePanelId.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";

export const resolveCategoryConfigurePanelId = (
  sectionId: CategoryConfigureSectionId
): string =>
  [CATEGORY_CONFIGURE_PANEL_ID_PREFIX, sectionId].join(
    STRING.DASH
  );

import { STRING } from "@/app/constants";
import { CATEGORY_CARD_PANEL_ID_PREFIX } from "../constants/CategoryCardPanelId.constants";

export const resolveCategoryCardPanelId = (
  categoryId: string
): string =>
  [CATEGORY_CARD_PANEL_ID_PREFIX, categoryId].join(
    STRING.DASH
  );

import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { isCategoryInactive } from "./isCategoryInactive";

export const buildCategoryStatusNotes = (
  category: CategoryListItem
): string[] => {
  if (isCategoryInactive(category)) {
    return [CATEGORY_CATALOG_COPY.STATUS_NOTE_INACTIVE];
  }

  const statusNotes: string[] = [];

  if (!category.isReservable) {
    statusNotes.push(
      CATEGORY_CATALOG_COPY.STATUS_NOTE_NOT_RESERVABLE
    );
  }

  if (category.isReservable && !category.hasImage) {
    statusNotes.push(
      CATEGORY_CATALOG_COPY.STATUS_NOTE_NO_IMAGE
    );
  }

  return statusNotes;
};

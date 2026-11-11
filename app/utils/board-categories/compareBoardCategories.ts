import { CALENDAR_PRESENTATION } from "@/app/constants";
import type { BoardCategoryIdentity } from "./models/BoardCategoryIdentity.interface";

export const compareBoardCategories = (
  left: BoardCategoryIdentity,
  right: BoardCategoryIdentity
): number =>
  left.name.localeCompare(
    right.name,
    CALENDAR_PRESENTATION.LOCALE
  ) ||
  left.id.localeCompare(
    right.id,
    CALENDAR_PRESENTATION.LOCALE
  );

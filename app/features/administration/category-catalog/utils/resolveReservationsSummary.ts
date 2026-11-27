import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { formatCategoryDurationLabel } from "./formatCategoryDurationLabel";
import { joinSummaryParts } from "./joinSummaryParts";

export const resolveReservationsSummary = (
  behavior: CategoryBehavior
): string => {
  if (!behavior.isReservable) {
    return CATEGORY_CONFIGURE_COPY.RESERVATIONS_NOT_RESERVABLE;
  }

  const parts: string[] = [
    CATEGORY_CONFIGURE_COPY.RESERVABLE,
  ];
  if (behavior.defaultDurationMinutes) {
    parts.push(
      formatCategoryDurationLabel(
        behavior.defaultDurationMinutes
      )
    );
  }
  if (behavior.guideOnly) {
    parts.push(CATEGORY_CONFIGURE_COPY.STATUS_GUIDE_ONLY);
  }

  return joinSummaryParts(parts);
};

import { STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
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
      [
        behavior.defaultDurationMinutes,
        CATEGORY_CONFIGURE_COPY.DURATION_UNIT,
      ].join(STRING.SPACE)
    );
  }
  if (behavior.guideOnly) {
    parts.push(CATEGORY_CONFIGURE_COPY.STATUS_GUIDE_ONLY);
  }

  return joinSummaryParts(parts);
};

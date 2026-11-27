import { LENGTH } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { joinSummaryParts } from "./joinSummaryParts";

export const resolveTraitsSummary = (
  behavior: CategoryBehavior
): string => {
  const parts: string[] = [];
  if (behavior.hasMotor) {
    parts.push(CATEGORY_CONFIGURE_COPY.TRAIT_HAS_MOTOR);
  }
  if (behavior.consumesFuel) {
    parts.push(CATEGORY_CONFIGURE_COPY.TRAIT_CONSUMES_FUEL);
  }
  if (behavior.canBeDamaged) {
    parts.push(
      CATEGORY_CONFIGURE_COPY.TRAIT_CAN_BE_DAMAGED
    );
  }
  if (behavior.hasConditionPhotos) {
    parts.push(
      CATEGORY_CONFIGURE_COPY.TRAIT_HAS_CONDITION_PHOTOS
    );
  }

  return parts.length === LENGTH.ZERO
    ? CATEGORY_CONFIGURE_COPY.TRAITS_NONE
    : joinSummaryParts(parts);
};

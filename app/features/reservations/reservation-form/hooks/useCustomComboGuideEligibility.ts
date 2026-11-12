import { useEffect, useMemo, useRef } from "react";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationType } from "../models/ReservationType.type";

export const useCustomComboGuideEligibility = (
  draft: CustomComboReservationDraft,
  categories: ReservationCategoryOption[],
  onGuideIdsChange: (guideIds: string[]) => void,
  reservationType: ReservationType
) => {
  const guideOnlyCategoryIds = useMemo(
    () =>
      new Set(
        categories
          .filter(({ isGuideOnly }) => isGuideOnly)
          .map(({ id }) => id)
      ),
    [categories]
  );
  const hasGuideOnlyItem = draft.items.some(
    ({ categoryId }) => guideOnlyCategoryIds.has(categoryId)
  );
  const hadGuideOnlyItem = useRef(hasGuideOnlyItem);

  useEffect(() => {
    if (
      reservationType === RESERVATION_TYPE.COMBO &&
      hadGuideOnlyItem.current &&
      !hasGuideOnlyItem
    ) {
      onGuideIdsChange([]);
    }
    hadGuideOnlyItem.current = hasGuideOnlyItem;
  }, [hasGuideOnlyItem, onGuideIdsChange, reservationType]);

  return hasGuideOnlyItem;
};

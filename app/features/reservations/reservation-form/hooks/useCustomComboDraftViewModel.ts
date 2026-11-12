import { useReducer } from "react";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormErrorField } from "../models/ReservationFormField.constants";
import { reduceCustomComboDraft } from "../utils/reduceCustomComboDraft";
import { useCustomComboDraftActions } from "./useCustomComboDraftActions";
import { useCustomComboGuideEligibility } from "./useCustomComboGuideEligibility";

export const useCustomComboDraftViewModel = (
  categories: ReservationCategoryOption[],
  onGuideIdsChange: (guideIds: string[]) => void,
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void
) => {
  const [draft, dispatch] = useReducer(
    reduceCustomComboDraft,
    CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS
  );
  const hasGuideOnlyItem = useCustomComboGuideEligibility(
    draft,
    categories,
    onGuideIdsChange
  );
  const actions = useCustomComboDraftActions(
    draft,
    dispatch,
    clearFieldError
  );

  return { draft, hasGuideOnlyItem, ...actions };
};

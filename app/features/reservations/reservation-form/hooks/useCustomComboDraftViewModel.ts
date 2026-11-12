import { useReducer } from "react";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import type { ReservationFormErrorField } from "../models/ReservationFormField.constants";
import type { ReservationType } from "../models/ReservationType.type";
import { reduceCustomComboDraft } from "../utils/reduceCustomComboDraft";
import { useCustomComboDraftActions } from "./useCustomComboDraftActions";
import { useCustomComboGuideEligibility } from "./useCustomComboGuideEligibility";

export const useCustomComboDraftViewModel = (
  categories: ReservationCategoryOption[],
  onGuideIdsChange: (guideIds: string[]) => void,
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void,
  reservationType: ReservationType
) => {
  const [draft, dispatch] = useReducer(
    reduceCustomComboDraft,
    CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS
  );
  const hasGuideOnlyItem = useCustomComboGuideEligibility(
    draft,
    categories,
    onGuideIdsChange,
    reservationType
  );
  const actions = useCustomComboDraftActions(
    draft,
    dispatch,
    clearFieldError
  );
  const reset = (): void => {
    dispatch({ type: CUSTOM_COMBO_DRAFT_ACTION.RESET });
    onGuideIdsChange([]);
  };

  return { draft, hasGuideOnlyItem, reset, ...actions };
};

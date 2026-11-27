import type { CustomComboFormOptions } from "../models/CustomComboFormOptions.interface";
import { STRING } from "@/app/constants";
import { useCustomComboDraftViewModel } from "./useCustomComboDraftViewModel";
import { useCustomComboPricingViewModel } from "./useCustomComboPricingViewModel";
import { getCustomComboExtraUnitId } from "../utils/getCustomComboExtraUnitId";
import { useCustomComboConflictWarning } from "./useCustomComboConflictWarning";

export const useCustomComboForm = ({
  categories,
  clearFieldError,
  durationHours,
  date = STRING.Empty,
  onGuideIdsChange,
  reservationType,
  time = STRING.Empty,
}: CustomComboFormOptions) => {
  const draft = useCustomComboDraftViewModel(
    categories,
    onGuideIdsChange,
    clearFieldError,
    reservationType
  );
  const extraUnitId = getCustomComboExtraUnitId(
    draft.draft.items,
    categories
  );
  const pricing = useCustomComboPricingViewModel(
    draft.draft,
    durationHours,
    reservationType
  );
  const conflictWarning = useCustomComboConflictWarning(
    draft.draft.items,
    date,
    durationHours,
    time
  );
  return {
    ...draft,
    conflictWarning,
    extraUnitId,
    pricing: pricing.state,
    handlePricingRetry: pricing.retry,
  };
};

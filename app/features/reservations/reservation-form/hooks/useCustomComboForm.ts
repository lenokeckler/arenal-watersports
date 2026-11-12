import type { CustomComboFormOptions } from "../models/CustomComboFormOptions.interface";
import { useCustomComboDraftViewModel } from "./useCustomComboDraftViewModel";
import { useCustomComboPricingViewModel } from "./useCustomComboPricingViewModel";
import { getCustomComboExtraUnitId } from "../utils/getCustomComboExtraUnitId";

export const useCustomComboForm = ({
  categories,
  clearFieldError,
  durationHours,
  onGuideIdsChange,
  reservationType,
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
  return {
    ...draft,
    extraUnitId,
    pricing: pricing.state,
    handlePricingRetry: pricing.retry,
  };
};

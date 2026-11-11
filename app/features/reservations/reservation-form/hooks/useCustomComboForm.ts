import type { CustomComboFormOptions } from "../models/CustomComboFormOptions.interface";
import { useCustomComboDraftViewModel } from "./useCustomComboDraftViewModel";
import { useCustomComboPricingViewModel } from "./useCustomComboPricingViewModel";

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
    clearFieldError
  );
  const pricing = useCustomComboPricingViewModel(
    draft.draft,
    durationHours,
    reservationType
  );
  return {
    ...draft,
    pricing: pricing.state,
    handlePricingRetry: pricing.retry,
  };
};

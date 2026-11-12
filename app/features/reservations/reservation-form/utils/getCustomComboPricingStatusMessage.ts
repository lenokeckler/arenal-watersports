import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import { STRING } from "@/app/constants";
import type { CustomComboPricingState } from "../models/CustomComboPricingState.type";

export const getCustomComboPricingStatusMessage = (
  state: CustomComboPricingState
): string => {
  switch (state.status) {
    case CUSTOM_COMBO_PRICING_STATUS.IDLE:
      return CUSTOM_COMBO_FORM_COPY.NO_ITEMS;
    case CUSTOM_COMBO_PRICING_STATUS.LOADING:
      return CUSTOM_COMBO_FORM_COPY.PRICING_LOADING;
    case CUSTOM_COMBO_PRICING_STATUS.ERROR:
      return CUSTOM_COMBO_FORM_COPY.PRICING_ERROR;
    case CUSTOM_COMBO_PRICING_STATUS.READY:
      if (!state.pricing) {
        return CUSTOM_COMBO_FORM_COPY.PRICING_READY_EMPTY;
      }
      if (
        state.pricing.listAmountCrc === null &&
        state.pricing.listAmountUsd === null
      ) {
        return CUSTOM_COMBO_FORM_COPY.PRICING_READY_EMPTY;
      }
      return state.message ?? STRING.Empty;
    default:
      return STRING.Empty;
  }
};

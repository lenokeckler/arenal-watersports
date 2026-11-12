import { useState, useCallback } from "react";
import {
  CUSTOM_COMBO_PRICING_REQUEST_INCREMENT,
  CUSTOM_COMBO_PRICING_STATUS,
} from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricingState } from "../models/CustomComboPricingState.type";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { useCustomComboPricingRequest } from "./useCustomComboPricingRequest";

const EMPTY_PRICING_STATE: CustomComboPricingState = {
  message: null,
  pricing: null,
  status: CUSTOM_COMBO_PRICING_STATUS.IDLE,
};

export const useCustomComboPricing = (
  input: CustomComboPricingInput,
  isEnabled: boolean
) => {
  const [retryToken, setRetryToken] = useState(0);
  const { clear, state } = useCustomComboPricingRequest(
    input,
    isEnabled,
    retryToken
  );

  const retry = useCallback((): void => {
    clear();
    setRetryToken(
      (token) =>
        token + CUSTOM_COMBO_PRICING_REQUEST_INCREMENT
    );
  }, [clear]);

  return {
    state:
      !isEnabled || input.items.length === 0
        ? EMPTY_PRICING_STATE
        : state,
    retry,
  };
};

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { NullableRef } from "@/app/types";
import {
  CUSTOM_COMBO_PRICING_REQUEST_INCREMENT,
  CUSTOM_COMBO_PRICING_STATUS,
} from "../constants/CustomComboPricingStatus.constants";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import type { CustomComboPricingResolvedState } from "../models/CustomComboPricingResolvedState.interface";
import { requestCustomComboPricing } from "../utils/requestCustomComboPricing";

const LOADING_PRICING_STATE: CustomComboPricingResolvedState["state"] =
  {
    message: null,
    pricing: null,
    status: CUSTOM_COMBO_PRICING_STATUS.LOADING,
  };

const resolvePricingState = (
  resolved: NullableRef<CustomComboPricingResolvedState>,
  input: CustomComboPricingInput
) =>
  resolved?.input === input
    ? resolved.state
    : LOADING_PRICING_STATE;

export const useCustomComboPricingRequest = (
  input: CustomComboPricingInput,
  isEnabled: boolean,
  retryToken: number
) => {
  const [resolved, setResolved] =
    useState<NullableRef<CustomComboPricingResolvedState>>(
      null
    );
  const requestId = useRef(0);

  useEffect(() => {
    const currentRequestId =
      requestId.current +
      CUSTOM_COMBO_PRICING_REQUEST_INCREMENT;
    requestId.current = currentRequestId;
    if (isEnabled && input.items.length > 0) {
      void requestCustomComboPricing({
        input,
        isCurrentRequest: () =>
          requestId.current === currentRequestId,
        setState: (state) => setResolved({ input, state }),
      });
    }
    return () => {
      requestId.current +=
        CUSTOM_COMBO_PRICING_REQUEST_INCREMENT;
    };
  }, [input, isEnabled, retryToken]);

  const clear = useCallback(
    (): void => setResolved(null),
    []
  );
  const state = resolvePricingState(resolved, input);

  return { clear, state };
};

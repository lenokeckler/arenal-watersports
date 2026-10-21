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
import type { CustomComboPricingState } from "../models/CustomComboPricingState.type";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import type { CustomComboPricingResolvedState } from "../models/CustomComboPricingResolvedState.interface";
import { requestCustomComboPricing } from "../utils/requestCustomComboPricing";

const EMPTY_PRICING_STATE: CustomComboPricingState = {
  message: null,
  pricing: null,
  status: CUSTOM_COMBO_PRICING_STATUS.IDLE,
};

export const useCustomComboPricing = (
  input: CustomComboPricingInput
) => {
  const [resolvedState, setResolvedState] =
    useState<NullableRef<CustomComboPricingResolvedState>>(
      null
    );
  const requestId = useRef(0);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const currentRequestId =
      requestId.current +
      CUSTOM_COMBO_PRICING_REQUEST_INCREMENT;
    requestId.current = currentRequestId;
    if (input.items.length > 0) {
      void requestCustomComboPricing({
        input,
        isCurrentRequest: () =>
          requestId.current === currentRequestId,
        setState: (state) =>
          setResolvedState({ input, state }),
      });
    }
    return () => {
      requestId.current +=
        CUSTOM_COMBO_PRICING_REQUEST_INCREMENT;
    };
  }, [input, retryToken]);

  const retry = useCallback((): void => {
    setResolvedState(null);
    setRetryToken(
      (token) =>
        token + CUSTOM_COMBO_PRICING_REQUEST_INCREMENT
    );
  }, []);

  const isResolvedForCurrentInput =
    resolvedState?.input === input;
  const currentState = isResolvedForCurrentInput
    ? resolvedState.state
    : {
        message: null,
        pricing: null,
        status: CUSTOM_COMBO_PRICING_STATUS.LOADING,
      };

  return {
    state:
      input.items.length === 0
        ? EMPTY_PRICING_STATE
        : currentState,
    retry,
  };
};

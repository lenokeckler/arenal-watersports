import { RESERVATION_EXTRAS_PRICING_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtrasPricingRequestAction } from "../models/ReservationExtrasPricingRequestAction.type";
import type { ReservationExtrasPricingRequestState } from "../models/ReservationExtrasPricingRequestState.interface";

export const reduceReservationExtrasPricingRequestState = (
  state: ReservationExtrasPricingRequestState,
  action: ReservationExtrasPricingRequestAction
): ReservationExtrasPricingRequestState => {
  if (
    action.kind ===
    RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.SUCCEEDED
  ) {
    return {
      error:
        state.error?.key === action.key
          ? null
          : state.error,
      pricing: { key: action.key, value: action.pricing },
    };
  }
  return {
    error: { key: action.key, value: action.message },
    pricing: state.pricing,
  };
};

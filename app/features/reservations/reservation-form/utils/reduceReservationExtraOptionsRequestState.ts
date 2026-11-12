import { RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtraOptionsRequestAction } from "../models/ReservationExtraOptionsRequestAction.type";
import type { ReservationExtraOptionsRequestState } from "../models/ReservationExtraOptionsRequestState.interface";

export const reduceReservationExtraOptionsRequestState = (
  state: ReservationExtraOptionsRequestState,
  action: ReservationExtraOptionsRequestAction
): ReservationExtraOptionsRequestState => {
  if (
    action.kind ===
    RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION.LOADED
  ) {
    return {
      error:
        state.error?.key === action.key
          ? null
          : state.error,
      options: { key: action.key, value: action.options },
    };
  }
  return {
    error: { key: action.key, value: action.message },
    options: state.options,
  };
};

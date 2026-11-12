import { useMemo, useReducer } from "react";
import type { Dispatch } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationExtrasPricingActionResult } from "../models/ReservationExtrasPricingActionResult.type";
import type { ReservationExtrasPricingRequestAction } from "../models/ReservationExtrasPricingRequestAction.type";
import type { ReservationExtrasPricingRequestController } from "../models/ReservationExtrasPricingRequestController.interface";
import type { ReservationExtrasPricingRequestState } from "../models/ReservationExtrasPricingRequestState.interface";
import { RESERVATION_EXTRAS_PRICING_VIEW_MODEL_COPY } from "../constants/ReservationExtrasPricingViewModelCopy.constants";
import { RESERVATION_EXTRAS_PRICING_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import { reportReservationExtrasError } from "../utils/reportReservationExtrasError";
import { reduceReservationExtrasPricingRequestState } from "../utils/reduceReservationExtrasPricingRequestState";

const INITIAL_PRICING_STATE: ReservationExtrasPricingRequestState =
  {
    error: null,
    pricing: null,
  };

const createResultHandler =
  (
    requestKey: NullableRef<string>,
    dispatch: Dispatch<ReservationExtrasPricingRequestAction>
  ): ReservationExtrasPricingRequestController["onResult"] =>
  (result: ReservationExtrasPricingActionResult) => {
    if (requestKey === null) {
      return;
    }
    if (result.ok) {
      dispatch({
        key: requestKey,
        kind: RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.SUCCEEDED,
        pricing: result.pricing,
      });
      return;
    }
    dispatch({
      key: requestKey,
      kind: RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.FAILED,
      message: result.message,
    });
  };

const createErrorHandler =
  (
    requestKey: NullableRef<string>,
    dispatch: Dispatch<ReservationExtrasPricingRequestAction>
  ): ReservationExtrasPricingRequestController["onRequestError"] =>
  (error) => {
    if (requestKey === null) {
      return;
    }
    reportReservationExtrasError(error);
    dispatch({
      key: requestKey,
      kind: RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.FAILED,
      message:
        RESERVATION_EXTRAS_PRICING_VIEW_MODEL_COPY.ERROR,
    });
  };

export const useReservationExtrasPricingRequestState = (
  requestKey: NullableRef<string>
): ReservationExtrasPricingRequestController => {
  const [state, dispatch] = useReducer(
    reduceReservationExtrasPricingRequestState,
    INITIAL_PRICING_STATE
  );
  const handlers = useMemo(
    () => ({
      onRequestError: createErrorHandler(
        requestKey,
        dispatch
      ),
      onResult: createResultHandler(requestKey, dispatch),
    }),
    [dispatch, requestKey]
  );
  return { ...handlers, state };
};

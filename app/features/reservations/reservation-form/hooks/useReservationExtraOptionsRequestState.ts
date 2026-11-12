import { useMemo, useReducer } from "react";
import type { Dispatch } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRA_OPTIONS_COPY } from "../constants/ReservationExtraOptionsCopy.constants";
import { RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtraOptionsRequestAction } from "../models/ReservationExtraOptionsRequestAction.type";
import type { ReservationExtraOptionsRequestController } from "../models/ReservationExtraOptionsRequestController.interface";
import type { ReservationExtraOptionsRequestState } from "../models/ReservationExtraOptionsRequestState.interface";
import { reportReservationExtrasError } from "../utils/reportReservationExtrasError";
import { reduceReservationExtraOptionsRequestState } from "../utils/reduceReservationExtraOptionsRequestState";

const INITIAL_REQUEST_STATE: ReservationExtraOptionsRequestState =
  {
    error: null,
    options: null,
  };

const createLoadedHandler =
  (
    requestKey: NullableRef<string>,
    dispatch: Dispatch<ReservationExtraOptionsRequestAction>
  ): ReservationExtraOptionsRequestController["onLoaded"] =>
  (options) => {
    if (requestKey !== null) {
      dispatch({
        key: requestKey,
        kind: RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION.LOADED,
        options,
      });
    }
  };

const createFailedHandler =
  (
    requestKey: NullableRef<string>,
    dispatch: Dispatch<ReservationExtraOptionsRequestAction>
  ): ReservationExtraOptionsRequestController["onFailed"] =>
  (error) => {
    if (requestKey !== null) {
      reportReservationExtrasError(error);
      dispatch({
        key: requestKey,
        kind: RESERVATION_EXTRA_OPTIONS_REQUEST_ACTION.FAILED,
        message: RESERVATION_EXTRA_OPTIONS_COPY.ERROR,
      });
    }
  };

export const useReservationExtraOptionsRequestState = (
  requestKey: NullableRef<string>
): ReservationExtraOptionsRequestController => {
  const [state, dispatch] = useReducer(
    reduceReservationExtraOptionsRequestState,
    INITIAL_REQUEST_STATE
  );
  const handlers = useMemo(
    () => ({
      onFailed: createFailedHandler(requestKey, dispatch),
      onLoaded: createLoadedHandler(requestKey, dispatch),
    }),
    [dispatch, requestKey]
  );
  return { ...handlers, state };
};

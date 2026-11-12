import { useCallback, useState } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRAS_REQUEST } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtraOptionsViewModel } from "../models/ReservationExtraOptionsViewModel.interface";
import { useReservationExtraOptionsLoader } from "./useReservationExtraOptionsLoader";
import { useReservationExtrasRequestKey } from "./useReservationExtrasRequestKey";

export const useReservationExtraOptionsRequest = (
  unitId: string,
  requestKey: NullableRef<string>
): ReservationExtraOptionsViewModel => {
  const [retryToken, setRetryToken] = useState(0);
  const retryableRequestKey =
    requestKey === null
      ? null
      : JSON.stringify([requestKey, retryToken]);
  const activeRequestKey = useReservationExtrasRequestKey(
    retryableRequestKey
  );
  const requestState = useReservationExtraOptionsLoader(
    unitId,
    activeRequestKey
  );
  const hasCurrentOptions =
    requestState.options?.key === activeRequestKey;
  const hasCurrentError =
    requestState.error?.key === activeRequestKey;
  const retry = useCallback((): void => {
    setRetryToken(
      (token) =>
        token + RESERVATION_EXTRAS_REQUEST.INCREMENT
    );
  }, []);

  return {
    error:
      hasCurrentError && requestState.error !== null
        ? requestState.error.value
        : null,
    isLoading:
      activeRequestKey !== null &&
      !hasCurrentOptions &&
      !hasCurrentError,
    options:
      hasCurrentOptions && requestState.options !== null
        ? requestState.options.value
        : [],
    retry,
  };
};

import { useCallback, useState } from "react";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRAS_REQUEST } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import type { ReservationExtrasPricingViewModel } from "../models/ReservationExtrasPricingViewModel.interface";
import { useReservationExtrasPricingLoader } from "./useReservationExtrasPricingLoader";
import { useReservationExtrasRequestKey } from "./useReservationExtrasRequestKey";
import { createReservationExtrasPricingViewModel } from "../utils/createReservationExtrasPricingViewModel";

export const useReservationExtrasPricingViewModel = (
  pricingInput: NullableRef<ReservationExtrasPricingInput>
): ReservationExtrasPricingViewModel => {
  const [retryToken, setRetryToken] = useState(0);
  const requestKey =
    pricingInput === null
      ? null
      : JSON.stringify([pricingInput, retryToken]);
  const activeRequestKey =
    useReservationExtrasRequestKey(requestKey);
  const state = useReservationExtrasPricingLoader(
    pricingInput,
    activeRequestKey
  );
  const retryPricing = useCallback((): void => {
    setRetryToken(
      (token) =>
        token + RESERVATION_EXTRAS_REQUEST.INCREMENT
    );
  }, []);

  return createReservationExtrasPricingViewModel(
    state,
    activeRequestKey,
    retryPricing
  );
};

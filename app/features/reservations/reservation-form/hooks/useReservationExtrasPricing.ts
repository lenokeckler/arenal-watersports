import { useMemo } from "react";
import type { ReservationExtrasPricingViewModel } from "../models/ReservationExtrasPricingViewModel.interface";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { createReservationExtrasPricingInput } from "../utils/createReservationExtrasPricingInput";
import { useReservationExtrasPricingViewModel } from "./useReservationExtrasPricingViewModel";

export const useReservationExtrasPricing = (
  input: ReservationExtrasViewModelInput
): ReservationExtrasPricingViewModel => {
  const {
    durationHours,
    extraIds,
    reservationType,
    unitId,
  } = input;
  const pricingInput = useMemo(
    () =>
      createReservationExtrasPricingInput({
        durationHours,
        extraIds,
        reservationType,
        unitId,
      }),
    [durationHours, extraIds, reservationType, unitId]
  );
  return useReservationExtrasPricingViewModel(pricingInput);
};

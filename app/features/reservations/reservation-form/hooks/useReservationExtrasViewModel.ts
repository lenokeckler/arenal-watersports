import type { ReservationExtrasViewModel } from "../models/ReservationExtrasViewModel.interface";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { useReservationExtraOptions } from "./useReservationExtraOptions";
import { useReservationExtrasPricing } from "./useReservationExtrasPricing";

export const useReservationExtrasViewModel = (
  input: ReservationExtrasViewModelInput
): ReservationExtrasViewModel => {
  const options = useReservationExtraOptions(
    input.unitId,
    input.reservationType
  );
  const pricing = useReservationExtrasPricing(input);

  return { ...options, ...pricing };
};

import type { NullableRef } from "@/app/types";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { isReservationExtrasPricingInput } from "./isReservationExtrasPricingInput";
import { resolveReservationExtrasPricingType } from "./resolveReservationExtrasPricingType";

export const createReservationExtrasPricingInput = (
  input: ReservationExtrasViewModelInput
): NullableRef<ReservationExtrasPricingInput> => {
  const reservationType =
    resolveReservationExtrasPricingType(
      input.reservationType
    );
  if (reservationType === null) {
    return null;
  }
  const candidate: ReservationExtrasPricingInput = {
    durationHours: input.durationHours,
    extraIds: input.extraIds,
    reservationType,
    unitId: input.unitId,
  };
  return isReservationExtrasPricingInput(candidate)
    ? candidate
    : null;
};

import type { NullableRef } from "@/app/types";
import type { ReservationExtrasPricingInput } from "../models/ReservationExtrasPricingInput.interface";
import type { ReservationExtrasPricingRequestState } from "../models/ReservationExtrasPricingRequestState.interface";
import { useReservationExtrasPricingRequestEffect } from "./useReservationExtrasPricingRequestEffect";
import { useReservationExtrasPricingRequestState } from "./useReservationExtrasPricingRequestState";

export const useReservationExtrasPricingLoader = (
  input: NullableRef<ReservationExtrasPricingInput>,
  requestKey: NullableRef<string>
): ReservationExtrasPricingRequestState => {
  const controller =
    useReservationExtrasPricingRequestState(requestKey);
  useReservationExtrasPricingRequestEffect(
    input,
    requestKey,
    controller.onResult,
    controller.onRequestError
  );
  return controller.state;
};

import type { ReservationExtrasPricingActionResult } from "./ReservationExtrasPricingActionResult.type";
import type { ReservationExtrasPricingRequestState } from "./ReservationExtrasPricingRequestState.interface";

export interface ReservationExtrasPricingRequestController {
  onRequestError: (error: unknown) => void;
  onResult: (
    result: ReservationExtrasPricingActionResult
  ) => void;
  state: ReservationExtrasPricingRequestState;
}

import type { ReservationRefundSubmission } from "./ReservationRefundSubmission.interface";
import type { ReservationRefundValues } from "./ReservationRefundValues.interface";
import type { ReservationRefundValuesState } from "./ReservationRefundValuesState.interface";

export interface ReservationRefundViewModel
  extends
    ReservationRefundValues,
    Omit<ReservationRefundSubmission, "clearErrors">,
    Omit<ReservationRefundValuesState, "values"> {
  hasCurrencyChoice: boolean;
  isSubmitDisabled: boolean;
}

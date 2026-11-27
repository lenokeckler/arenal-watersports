import type { ReservationDepositSubmission } from "./ReservationDepositSubmission.interface";
import type { ReservationDepositValues } from "./ReservationDepositValues.interface";
import type { ReservationDepositValuesState } from "./ReservationDepositValuesState.interface";

export interface ReservationDepositViewModel
  extends
    ReservationDepositValues,
    Omit<ReservationDepositSubmission, "clearErrors">,
    Omit<ReservationDepositValuesState, "values"> {
  isSubmitDisabled: boolean;
}

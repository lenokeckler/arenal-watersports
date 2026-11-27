import type { ReservationDepositErrors } from "./ReservationDepositErrors.interface";

export interface ReservationDepositErrorsState {
  clearErrors: () => void;
  errors: ReservationDepositErrors;
  formError: string;
  showErrors: (
    errors: ReservationDepositErrors,
    formError?: string
  ) => void;
}

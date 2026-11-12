import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";

export interface ReservationChargeErrorsState {
  clearErrors: () => void;
  errors: ReservationChargeErrors;
  formError: string;
  showErrors: (
    errors: ReservationChargeErrors,
    formError?: string
  ) => void;
}

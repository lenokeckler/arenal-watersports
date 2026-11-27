import type { ReservationExtraTimeErrors } from "./ReservationExtraTimeErrors.interface";

export interface ReservationExtraTimeErrorsState {
  clearErrors: () => void;
  errors: ReservationExtraTimeErrors;
  formError: string;
  showErrors: (
    errors: ReservationExtraTimeErrors,
    formError?: string
  ) => void;
}

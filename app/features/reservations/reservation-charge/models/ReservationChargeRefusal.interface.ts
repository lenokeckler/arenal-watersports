import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";

export interface ReservationChargeRefusal {
  errors?: ReservationChargeErrors;
  formError?: string;
  message: string;
}

import type { ReservationCancellationErrors } from "./ReservationCancellationErrors.interface";

export interface ReservationCancellationRefusal {
  errors?: ReservationCancellationErrors;
  formError?: string;
  message: string;
}

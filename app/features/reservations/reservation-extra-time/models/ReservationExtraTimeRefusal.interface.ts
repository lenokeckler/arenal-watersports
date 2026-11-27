import type { ReservationExtraTimeErrors } from "./ReservationExtraTimeErrors.interface";

export interface ReservationExtraTimeRefusal {
  errors?: ReservationExtraTimeErrors;
  formError?: string;
  message: string;
}

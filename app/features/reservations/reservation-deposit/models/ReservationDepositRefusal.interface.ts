import type { ReservationDepositErrors } from "./ReservationDepositErrors.interface";

export interface ReservationDepositRefusal {
  errors?: ReservationDepositErrors;
  formError?: string;
  message: string;
}

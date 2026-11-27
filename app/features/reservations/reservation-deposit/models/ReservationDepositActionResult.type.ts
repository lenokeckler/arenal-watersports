import type { ReservationDepositErrors } from "./ReservationDepositErrors.interface";
import type { ReservationDepositRecorded } from "./ReservationDepositRecorded.interface";

export type ReservationDepositActionResult =
  | {
      ok: true;
      recorded: ReservationDepositRecorded;
    }
  | {
      errors: ReservationDepositErrors;
      formError?: string;
      ok: false;
    };

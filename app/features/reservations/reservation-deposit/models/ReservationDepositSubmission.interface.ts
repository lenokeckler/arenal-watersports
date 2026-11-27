import type { NullableRef } from "@/app/types";
import type { ReservationDepositErrors } from "./ReservationDepositErrors.interface";
import type { ReservationDepositRecorded } from "./ReservationDepositRecorded.interface";

export interface ReservationDepositSubmission {
  clearErrors: () => void;
  errors: ReservationDepositErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  mayBeRecorded: boolean;
  recorded: NullableRef<ReservationDepositRecorded>;
}

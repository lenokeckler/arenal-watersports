import type { NullableRef } from "@/app/types";
import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";
import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export interface ReservationChargeSubmission {
  clearErrors: () => void;
  errors: ReservationChargeErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  recorded: NullableRef<ReservationChargeRecorded>;
}

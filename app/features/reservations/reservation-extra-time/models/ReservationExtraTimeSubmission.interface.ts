import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeErrors } from "./ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeRecorded } from "./ReservationExtraTimeRecorded.interface";

export interface ReservationExtraTimeSubmission {
  clearErrors: () => void;
  errors: ReservationExtraTimeErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  recorded: NullableRef<ReservationExtraTimeRecorded>;
}

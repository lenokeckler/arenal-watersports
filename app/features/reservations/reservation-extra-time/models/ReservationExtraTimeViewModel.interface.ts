import type { NullableRef } from "@/app/types";
import type { ReservationExtraTimeErrors } from "./ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeRecorded } from "./ReservationExtraTimeRecorded.interface";
import type { ReservationExtraTimeValues } from "./ReservationExtraTimeValues.interface";
import type { ReservationExtraTimeValuesState } from "./ReservationExtraTimeValuesState.interface";

export interface ReservationExtraTimeViewModel
  extends
    ReservationExtraTimeValues,
    Omit<ReservationExtraTimeValuesState, "values"> {
  errors: ReservationExtraTimeErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isCharged: boolean;
  isPending: boolean;
  isSubmitDisabled: boolean;
  recorded: NullableRef<ReservationExtraTimeRecorded>;
}

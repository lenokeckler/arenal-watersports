import type { ReservationSplitCreatedDeparture } from "./ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitDepartureErrors } from "./ReservationSplitDepartureErrors.interface";
import type { ReservationSplitErrors } from "./ReservationSplitErrors.interface";
import type { ReservationSplitInput } from "./ReservationSplitInput.interface";

export interface ReservationSplitSubmission {
  clearDepartureError: (
    index: number,
    field: keyof ReservationSplitDepartureErrors
  ) => void;
  clearErrors: () => void;
  createdDepartures: ReservationSplitCreatedDeparture[];
  errors: ReservationSplitErrors;
  formError: string;
  isPending: boolean;
  isStale: boolean;
  reportErrors: (errors: ReservationSplitErrors) => void;
  submit: (input: ReservationSplitInput) => Promise<void>;
}

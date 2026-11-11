import type { ReservationPostponementCause } from "./ReservationPostponementCause.type";
import type { ReservationPostponementDraftApi } from "./ReservationPostponementDraftApi.interface";
import type { ReservationPostponementErrors } from "./ReservationPostponementErrors.interface";

export interface ReservationPostponementViewModel extends ReservationPostponementDraftApi {
  causes: readonly ReservationPostponementCause[];
  errors: ReservationPostponementErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  isStale: boolean;
  isSubmitDisabled: boolean;
  isSubmitted: boolean;
}

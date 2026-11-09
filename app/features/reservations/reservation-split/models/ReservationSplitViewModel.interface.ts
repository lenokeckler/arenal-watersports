import type { ReservationSplitCreatedDeparture } from "./ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitDraftsApi } from "./ReservationSplitDraftsApi.interface";
import type { ReservationSplitErrors } from "./ReservationSplitErrors.interface";

export interface ReservationSplitViewModel extends ReservationSplitDraftsApi {
  announcement: string;
  createdDepartures: ReservationSplitCreatedDeparture[];
  errors: ReservationSplitErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isPending: boolean;
  isStale: boolean;
  isSubmitDisabled: boolean;
}

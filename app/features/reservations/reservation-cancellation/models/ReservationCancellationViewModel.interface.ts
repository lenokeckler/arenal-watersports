import type { ReservationCancellationErrors } from "./ReservationCancellationErrors.interface";

export interface ReservationCancellationViewModel {
  errors: ReservationCancellationErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isCancelled: boolean;
  isPending: boolean;
  isStale: boolean;
  isSubmitDisabled: boolean;
  reason: string;
  setReason: (reason: string) => void;
}

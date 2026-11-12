import type { ReservationCancellationErrors } from "./ReservationCancellationErrors.interface";

export interface ReservationCancellationViewModel {
  cause: string;
  confirmedRequiresCause: boolean;
  errors: ReservationCancellationErrors;
  formError: string;
  handleSubmit: (event?: React.FormEvent) => void;
  isCancelled: boolean;
  isPending: boolean;
  isStale: boolean;
  isSubmitDisabled: boolean;
  reason: string;
  requiresCause: boolean;
  setCause: (cause: string) => void;
  setReason: (reason: string) => void;
}

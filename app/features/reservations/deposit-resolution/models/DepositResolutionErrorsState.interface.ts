import type { DepositResolutionErrors } from "./DepositResolutionErrors.interface";

export interface DepositResolutionErrorsState {
  clearErrors: () => void;
  errors: DepositResolutionErrors;
  formError: string;
  showErrors: (
    errors: DepositResolutionErrors,
    formError?: string
  ) => void;
}

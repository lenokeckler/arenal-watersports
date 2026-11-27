import type { DepositResolutionErrors } from "./DepositResolutionErrors.interface";

export interface DepositResolutionRefusal {
  errors?: DepositResolutionErrors;
  formError?: string;
  message: string;
}

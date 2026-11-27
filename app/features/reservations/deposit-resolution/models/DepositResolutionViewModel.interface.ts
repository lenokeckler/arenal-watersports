import type { DepositResolutionSubmission } from "./DepositResolutionSubmission.interface";
import type { DepositResolutionValues } from "./DepositResolutionValues.interface";
import type { DepositResolutionValuesState } from "./DepositResolutionValuesState.interface";

export interface DepositResolutionViewModel
  extends
    DepositResolutionValues,
    Omit<DepositResolutionSubmission, "clearErrors">,
    Omit<DepositResolutionValuesState, "values"> {
  isSubmitDisabled: boolean;
}

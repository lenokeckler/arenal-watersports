import { DEPOSIT_RESOLUTION_NO_ERRORS } from "../constants/DepositResolutionDefaults.constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionErrors } from "../models/DepositResolutionErrors.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";
import { resolveDepositResolutionKept } from "./resolveDepositResolutionKept";
import { resolveDepositResolutionReasonError } from "./resolveDepositResolutionReasonError";
import { resolveDepositResolutionReturnedError } from "./resolveDepositResolutionReturnedError";

export const resolveDepositResolutionErrors = (
  values: DepositResolutionValues,
  deposit: Pick<DepositResolution, "amount" | "currency">
): DepositResolutionErrors => {
  if (values.returnsAll) {
    return DEPOSIT_RESOLUTION_NO_ERRORS;
  }
  const returned = resolveDepositResolutionReturnedError(
    values.returnedText,
    deposit
  );
  const kept = resolveDepositResolutionKept(
    values,
    deposit
  );
  const reason = resolveDepositResolutionReasonError(
    values.reasonText,
    kept !== null && kept > 0
  );
  return {
    ...(returned === undefined ? {} : { returned }),
    ...(reason === undefined ? {} : { reason }),
  };
};

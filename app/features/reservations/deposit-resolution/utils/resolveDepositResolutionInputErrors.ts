import type { DepositResolutionErrors } from "../models/DepositResolutionErrors.interface";
import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";
import { resolveDepositResolutionReasonError } from "./resolveDepositResolutionReasonError";
import { resolveDepositResolutionReturnedError } from "./resolveDepositResolutionReturnedError";

export const resolveDepositResolutionInputErrors = ({
  reasonText,
  returnedText,
}: DepositResolutionInput): DepositResolutionErrors => {
  const returned =
    resolveDepositResolutionReturnedError(returnedText);
  const reason = resolveDepositResolutionReasonError(
    reasonText,
    false
  );
  return {
    ...(returned === undefined ? {} : { returned }),
    ...(reason === undefined ? {} : { reason }),
  };
};

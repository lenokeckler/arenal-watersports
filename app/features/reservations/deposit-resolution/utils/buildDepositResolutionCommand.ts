import { STRING } from "@/app/constants";
import type { DepositResolutionCommand } from "../models/DepositResolutionCommand.interface";
import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";
import { parseDepositResolutionAmount } from "./parseDepositResolutionAmount";
import { trimDepositResolutionReason } from "./trimDepositResolutionReason";

export const buildDepositResolutionCommand = (
  input: DepositResolutionInput
): DepositResolutionCommand => {
  const reason = trimDepositResolutionReason(
    input.reasonText
  );
  return {
    depositId: input.depositId,
    reason: reason === STRING.Empty ? null : reason,
    returnedAmount: parseDepositResolutionAmount(
      input.returnedText
    ),
  };
};

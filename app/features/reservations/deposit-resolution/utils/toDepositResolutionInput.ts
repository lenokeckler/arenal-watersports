import { STRING } from "@/app/constants";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";

export const toDepositResolutionInput = (
  values: DepositResolutionValues,
  deposit: Pick<DepositResolution, "amount" | "id">
): DepositResolutionInput =>
  values.returnsAll
    ? {
        depositId: deposit.id,
        reasonText: STRING.Empty,
        returnedText: String(deposit.amount),
      }
    : {
        depositId: deposit.id,
        reasonText: values.reasonText,
        returnedText: values.returnedText,
      };

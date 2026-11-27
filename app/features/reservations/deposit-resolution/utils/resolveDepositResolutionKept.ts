import type { NullableRef } from "@/app/types";
import { fromMinorUnits } from "@/app/utils/money/fromMinorUnits";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import type { DepositResolution } from "../models/DepositResolution.interface";
import type { DepositResolutionValues } from "../models/DepositResolutionValues.interface";
import { parseDepositResolutionAmount } from "./parseDepositResolutionAmount";
import { resolveDepositResolutionReturnedError } from "./resolveDepositResolutionReturnedError";

export const resolveDepositResolutionKept = (
  values: Pick<
    DepositResolutionValues,
    "returnedText" | "returnsAll"
  >,
  deposit: Pick<DepositResolution, "amount" | "currency">
): NullableRef<number> => {
  if (values.returnsAll) {
    return 0;
  }
  if (
    resolveDepositResolutionReturnedError(
      values.returnedText,
      deposit
    ) !== undefined
  ) {
    return null;
  }
  return fromMinorUnits(
    toMinorUnits(deposit.amount) -
      toMinorUnits(
        parseDepositResolutionAmount(values.returnedText)
      )
  );
};

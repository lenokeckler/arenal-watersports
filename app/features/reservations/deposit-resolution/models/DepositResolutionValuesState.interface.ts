import type { NullableRef } from "@/app/types";
import type { DepositResolutionValues } from "./DepositResolutionValues.interface";

export interface DepositResolutionValuesState {
  keptAmount: NullableRef<number>;
  setReasonText: (text: string) => void;
  setReturnedText: (text: string) => void;
  setReturnsAll: (returnsAll: boolean) => void;
  values: DepositResolutionValues;
}

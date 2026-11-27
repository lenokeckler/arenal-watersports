import type { NullableRef } from "@/app/types";
import type { DepositResolution } from "./DepositResolution.interface";

export interface DepositResolutionReturnedFieldProps {
  deposit: Pick<DepositResolution, "amount" | "currency">;
  error?: string;
  isPending: boolean;
  keptAmount: NullableRef<number>;
  onChange: (text: string) => void;
  text: string;
}

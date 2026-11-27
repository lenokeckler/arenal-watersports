import type { NullableRef } from "@/app/types";

export interface DepositResolutionCommand {
  depositId: string;
  reason: NullableRef<string>;
  returnedAmount: number;
}

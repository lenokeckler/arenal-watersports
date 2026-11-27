import type { CurrencyCode } from "@/app/constants";
import type { Database, NullableRef } from "@/app/types";

export interface DepositResolutionRecorded {
  currency: CurrencyCode;
  depositAmount: number;
  keptAmount: number;
  reason: NullableRef<string>;
  resolvedByName: NullableRef<string>;
  returnedAmount: number;
  status: Database["public"]["Enums"]["deposit_status"];
}

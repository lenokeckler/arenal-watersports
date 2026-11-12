import type { NullableRef } from "@/app/types";

export interface CategoryDepositAmounts {
  depositCrc: NullableRef<number>;
  depositUsd: NullableRef<number>;
}

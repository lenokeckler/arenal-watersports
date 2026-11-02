import type { NullableRef } from "@/app/types";

export interface CategoryDeposit {
  id: string;
  depositUsd: NullableRef<number>;
  depositCrc: NullableRef<number>;
}

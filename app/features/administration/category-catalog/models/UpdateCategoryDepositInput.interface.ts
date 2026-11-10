import type { NullableRef } from "@/app/types";

export interface UpdateCategoryDepositInput {
  categoryId: string;
  depositUsd: NullableRef<number>;
  depositCrc: NullableRef<number>;
}

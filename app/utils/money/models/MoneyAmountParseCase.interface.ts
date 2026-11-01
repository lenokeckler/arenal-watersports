import type { NullableRef } from "@/app/types";

export interface MoneyAmountParseCase {
  amountText: string;
  expectedAmount: NullableRef<number>;
}

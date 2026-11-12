import type { NullableRef } from "@/app/types";

export interface CustomComboAgreedAmountFieldViewModelOptions {
  amount: NullableRef<number>;
  currency: string;
  fieldError: string;
  onChange: (amount: NullableRef<number>) => void;
  suggestedAmount: NullableRef<number>;
}

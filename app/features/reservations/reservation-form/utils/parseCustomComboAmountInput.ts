import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const parseCustomComboAmountInput = (
  value: string
): NullableRef<number> =>
  value === STRING.Empty ? null : Number(value);

import type { CurrencyCode } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";

export interface ExtraPriceTextCase {
  currency: CurrencyCode;
  text: string;
  expectedError: NullableUndefined<string>;
}

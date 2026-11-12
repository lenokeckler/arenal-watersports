import type { CurrencyCode } from "@/app/constants";

export interface ExtraInvalidPriceFieldCase {
  description: string;
  currency: CurrencyCode;
  text: string;
  expectedError: string;
}

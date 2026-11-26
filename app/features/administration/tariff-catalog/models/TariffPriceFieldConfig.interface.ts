import type { CurrencyCode } from "@/app/constants";
import type { TariffPriceField } from "./TariffPriceField.type";
import type { TariffTypeFormErrors } from "./TariffTypeFormErrors.interface";

export interface TariffPriceFieldConfig {
  currency: CurrencyCode;
  errorKey: Exclude<keyof TariffTypeFormErrors, "required">;
  label: string;
  textKey: TariffPriceField;
}

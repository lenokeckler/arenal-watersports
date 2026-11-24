import type { TariffPriceField } from "./TariffPriceField.type";
import type { TariffTypeFormErrors } from "./TariffTypeFormErrors.interface";

export interface TariffPriceFieldConfig {
  errorKey: Exclude<keyof TariffTypeFormErrors, "required">;
  label: string;
  textKey: TariffPriceField;
}

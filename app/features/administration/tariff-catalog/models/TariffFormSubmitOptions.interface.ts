import type { TariffForEdit } from "./TariffForEdit.type";
import type { TariffFormValues } from "./TariffFormValues.interface";

export interface TariffFormSubmitOptions {
  tariff: TariffForEdit;
  values: TariffFormValues;
}

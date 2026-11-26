import type { TariffTypeFormErrors } from "./TariffTypeFormErrors.interface";

export interface TariffFormErrors {
  count: number;
  form?: string;
  rental: TariffTypeFormErrors;
  tour: TariffTypeFormErrors;
}

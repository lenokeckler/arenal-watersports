import { STRING } from "@/app/constants";
import type { TariffFormErrors } from "../models/TariffFormErrors.interface";
import type { TariffFormValues } from "../models/TariffFormValues.interface";
import type { TariffTypeFormValues } from "../models/TariffTypeFormValues.interface";

const EMPTY_TARIFF_TYPE_FORM_VALUES: TariffTypeFormValues =
  {
    crcText: STRING.Empty,
    usdText: STRING.Empty,
  };

export const DEFAULT_TARIFF_FORM_VALUES: TariffFormValues =
  {
    rental: EMPTY_TARIFF_TYPE_FORM_VALUES,
    tour: EMPTY_TARIFF_TYPE_FORM_VALUES,
  };

export const NO_TARIFF_FORM_ERRORS: TariffFormErrors = {
  count: 0,
  rental: {},
  tour: {},
};

import type { TariffPriceField } from "../models/TariffPriceField.type";
import type { TariffType } from "../models/TariffType.type";
import { TARIFF_TYPE } from "./TariffType.constants";

export const TARIFF_FORM_HINT_ID = "tariff-form-hint";

export const TARIFF_FORM_FIELD_ID: Record<
  TariffType,
  Record<TariffPriceField, string>
> = {
  [TARIFF_TYPE.RENTAL]: {
    crcText: "tariff-rental-crc",
    usdText: "tariff-rental-usd",
  },
  [TARIFF_TYPE.TOUR]: {
    crcText: "tariff-tour-crc",
    usdText: "tariff-tour-usd",
  },
};

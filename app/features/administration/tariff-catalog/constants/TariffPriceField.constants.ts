import type { TariffPriceFieldConfig } from "../models/TariffPriceFieldConfig.interface";
import { TARIFF_FORM_COPY } from "./TariffFormCopy.constants";

export const TARIFF_PRICE_FIELDS: readonly TariffPriceFieldConfig[] =
  [
    {
      errorKey: "usd",
      label: TARIFF_FORM_COPY.USD_LABEL,
      textKey: "usdText",
    },
    {
      errorKey: "crc",
      label: TARIFF_FORM_COPY.CRC_LABEL,
      textKey: "crcText",
    },
  ];

import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { ComboAudience } from "../models/ComboAudience.type";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";

export const COMBO_AUDIENCE_CURRENCY: Record<
  ComboAudience,
  CurrencyCode
> = {
  [COMBO_AUDIENCE.FOREIGN]: CURRENCY_CODE.USD,
  [COMBO_AUDIENCE.NATIONAL]: CURRENCY_CODE.CRC,
};

export const COMBO_AUDIENCE_PRICE_COLUMN = {
  [COMBO_AUDIENCE.FOREIGN]: "package_price_usd",
  [COMBO_AUDIENCE.NATIONAL]: "package_price_crc",
} as const;

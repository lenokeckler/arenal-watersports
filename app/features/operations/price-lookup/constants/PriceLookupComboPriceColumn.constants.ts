import { PRICE_LOOKUP_AUDIENCE } from "./PriceLookupAudience.constants";

export const PRICE_LOOKUP_COMBO_PRICE_COLUMN = {
  [PRICE_LOOKUP_AUDIENCE.FOREIGN]: "package_price_usd",
  [PRICE_LOOKUP_AUDIENCE.NATIONAL]: "package_price_crc",
} as const;

import type { E2E_PRICE_LOOKUP_STATUS } from "../constants/E2ePriceLookup.constants";

export type PriceLookupSeedStatus =
  (typeof E2E_PRICE_LOOKUP_STATUS)[keyof typeof E2E_PRICE_LOOKUP_STATUS];

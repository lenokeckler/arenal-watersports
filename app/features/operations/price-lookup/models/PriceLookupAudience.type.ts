import { PRICE_LOOKUP_AUDIENCE } from "../constants/PriceLookupAudience.constants";

export type PriceLookupAudience =
  (typeof PRICE_LOOKUP_AUDIENCE)[keyof typeof PRICE_LOOKUP_AUDIENCE];

import type { PriceLookupAudience } from "../models/PriceLookupAudience.type";
import { PRICE_LOOKUP_AUDIENCE } from "./PriceLookupAudience.constants";
import { PRICE_LOOKUP_COPY } from "./PriceLookupCopy.constants";

export const PRICE_LOOKUP_AUDIENCE_HEADING: Record<
  PriceLookupAudience,
  string
> = {
  [PRICE_LOOKUP_AUDIENCE.FOREIGN]:
    PRICE_LOOKUP_COPY.FOREIGN_HEADING,
  [PRICE_LOOKUP_AUDIENCE.NATIONAL]:
    PRICE_LOOKUP_COPY.NATIONAL_HEADING,
};

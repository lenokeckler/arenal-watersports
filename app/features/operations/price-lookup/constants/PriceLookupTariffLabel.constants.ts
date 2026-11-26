import { RESERVATION_TYPE } from "@/app/constants";
import type { PriceLookupTariffType } from "../models/PriceLookupTariffType.type";
import { PRICE_LOOKUP_COPY } from "./PriceLookupCopy.constants";

export const PRICE_LOOKUP_TARIFF_LABEL: Record<
  PriceLookupTariffType,
  string
> = {
  [RESERVATION_TYPE.RENTAL]: PRICE_LOOKUP_COPY.RENTAL_LABEL,
  [RESERVATION_TYPE.TOUR]: PRICE_LOOKUP_COPY.TOUR_LABEL,
};

export const PRICE_LOOKUP_TARIFF_TYPE_ORDER: readonly PriceLookupTariffType[] =
  [RESERVATION_TYPE.RENTAL, RESERVATION_TYPE.TOUR];

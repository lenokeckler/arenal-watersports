import { RESERVATION_EXTRAS_PRICING } from "../constants/ReservationExtrasPricing.constants";

export type ReservationExtrasPricingType =
  (typeof RESERVATION_EXTRAS_PRICING.RESERVATION_TYPE)[keyof typeof RESERVATION_EXTRAS_PRICING.RESERVATION_TYPE];

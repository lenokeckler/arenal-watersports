import { RESERVATION_EXTRAS_PRICING_REQUEST_ACTION } from "../constants/ReservationExtrasRequest.constants";
import type { ReservationExtrasPricing } from "./ReservationExtrasPricing.interface";

export type ReservationExtrasPricingRequestAction =
  | {
      key: string;
      kind: typeof RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.FAILED;
      message: string;
    }
  | {
      key: string;
      kind: typeof RESERVATION_EXTRAS_PRICING_REQUEST_ACTION.SUCCEEDED;
      pricing: ReservationExtrasPricing;
    };

import type { NullableRef } from "@/app/types";
import type { ReservationExtraOption } from "./ReservationExtraOption.interface";
import type { ReservationExtrasPricing } from "./ReservationExtrasPricing.interface";

export interface ReservationExtrasViewModel {
  error: NullableRef<string>;
  isLoading: boolean;
  options: ReservationExtraOption[];
  pricing: NullableRef<ReservationExtrasPricing>;
  pricingError: NullableRef<string>;
  isPricingLoading: boolean;
  retry: () => void;
  retryPricing: () => void;
}

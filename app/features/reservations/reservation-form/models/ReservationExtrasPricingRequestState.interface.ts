import type { NullableRef } from "@/app/types";
import type { ReservationExtrasPricing } from "./ReservationExtrasPricing.interface";
import type { ReservationExtrasViewModelResult } from "./ReservationExtrasViewModelResult.interface";

export interface ReservationExtrasPricingRequestState {
  error: NullableRef<
    ReservationExtrasViewModelResult<string>
  >;
  pricing: NullableRef<
    ReservationExtrasViewModelResult<ReservationExtrasPricing>
  >;
}

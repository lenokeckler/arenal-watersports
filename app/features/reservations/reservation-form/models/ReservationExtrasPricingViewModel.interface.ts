import type { ReservationExtrasViewModel } from "./ReservationExtrasViewModel.interface";

export type ReservationExtrasPricingViewModel = Pick<
  ReservationExtrasViewModel,
  | "isPricingLoading"
  | "pricing"
  | "pricingError"
  | "retryPricing"
>;

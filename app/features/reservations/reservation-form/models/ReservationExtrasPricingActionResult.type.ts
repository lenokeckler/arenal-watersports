import type { ReservationExtrasPricing } from "./ReservationExtrasPricing.interface";

export type ReservationExtrasPricingActionResult =
  | { message: string; ok: false }
  | { ok: true; pricing: ReservationExtrasPricing };

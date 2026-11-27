import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";

export type ReservationChargePaymentErrors = Pick<
  ReservationChargeErrors,
  "otherPaymentMethod" | "paymentChoice"
>;

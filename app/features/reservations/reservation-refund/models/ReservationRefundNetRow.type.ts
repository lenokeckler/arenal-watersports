import type { Database } from "@/app/types";

export type ReservationRefundNetRow = Pick<
  Database["public"]["Functions"]["reservation_refundable_net"]["Returns"][number],
  "currency" | "refundable_amount"
>;

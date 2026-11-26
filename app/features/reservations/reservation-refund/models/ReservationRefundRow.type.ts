import type { Database } from "@/app/types";

export type ReservationRefundRow = Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "code"
  | "customer_name"
  | "id"
  | "parent_reservation_id"
  | "starts_at"
  | "status"
>;

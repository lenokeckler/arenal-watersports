import type { Database } from "@/app/types";

export type ReservationChargeRow = Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "code"
  | "customer_name"
  | "duration_minutes"
  | "id"
  | "parent_reservation_id"
  | "people_count"
  | "starts_at"
  | "status"
>;

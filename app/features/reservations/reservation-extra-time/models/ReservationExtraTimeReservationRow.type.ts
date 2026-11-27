import type { Database } from "@/app/types";

export type ReservationExtraTimeReservationRow = Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  "code" | "customer_name" | "id" | "status"
>;

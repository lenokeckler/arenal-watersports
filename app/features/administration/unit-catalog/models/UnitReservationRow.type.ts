import type { Database } from "@/app/types";

export type UnitReservationRow = Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  "id" | "code" | "customer_name" | "starts_at" | "status"
>;

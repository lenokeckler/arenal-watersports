import type { Database } from "@/app/types";

type DepositsTableRow =
  Database["public"]["Tables"]["deposits"]["Row"];
type ReservationsTableRow =
  Database["public"]["Tables"]["reservations"]["Row"];

export interface DepositRow extends Pick<
  DepositsTableRow,
  "id" | "amount" | "currency" | "status"
> {
  reservations: Pick<
    ReservationsTableRow,
    "code" | "customer_name"
  >;
}

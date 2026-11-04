import type { Database } from "@/app/types";

type DepositsTableRow =
  Database["public"]["Tables"]["deposits"]["Row"];
type ReservationsTableRow =
  Database["public"]["Tables"]["reservations"]["Row"];

export interface RetainedDepositRow extends Pick<
  DepositsTableRow,
  | "id"
  | "currency"
  | "status"
  | "retained_amount"
  | "retention_reason"
> {
  reservations: Pick<
    ReservationsTableRow,
    "code" | "customer_name"
  >;
}

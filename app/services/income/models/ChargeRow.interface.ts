import type { Database } from "@/app/types";

type ChargesTableRow =
  Database["public"]["Tables"]["reservation_charges"]["Row"];

export type ChargeRow = Pick<
  ChargesTableRow,
  "amount" | "currency" | "payment_method"
>;

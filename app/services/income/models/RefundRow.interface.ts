import type { Database } from "@/app/types";

type RefundsTableRow =
  Database["public"]["Tables"]["refunds"]["Row"];

export type RefundRow = Pick<
  RefundsTableRow,
  "amount" | "currency"
>;

import type { Money } from "@/app/utils/money/models/Money.interface";
import type { RefundRow } from "./models/RefundRow.interface";

export const mapRefundRow = (row: RefundRow): Money => ({
  amount: row.amount,
  currency: row.currency,
});

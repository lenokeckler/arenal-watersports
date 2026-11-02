import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import type { CategoryDepositRow } from "../models/CategoryDepositRow.type";

export const mapCategoryRowToDeposit = (
  categoryRow: CategoryDepositRow
): CategoryDeposit => ({
  id: categoryRow.id,
  depositUsd: categoryRow.deposit_usd,
  depositCrc: categoryRow.deposit_crc,
});

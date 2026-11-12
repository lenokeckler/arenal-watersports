import type { CategoryDepositRowUpdate } from "../models/CategoryDepositRowUpdate.type";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";

export const mapUpdateCategoryDepositInputToRow = (
  input: UpdateCategoryDepositInput,
  adminWorkerId: string
): CategoryDepositRowUpdate => ({
  deposit_usd: input.depositUsd ?? null,
  deposit_crc: input.depositCrc ?? null,
  updated_by: adminWorkerId,
});

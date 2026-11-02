import type { EquipmentCategoryRow } from "./EquipmentCategoryRow.type";

export type CategoryDepositRow = Pick<
  EquipmentCategoryRow,
  "id" | "deposit_usd" | "deposit_crc"
>;

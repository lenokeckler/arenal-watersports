import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";
import { mapCategoryRowToAlerts } from "./mapCategoryRowToAlerts";
import { mapCategoryRowToBehavior } from "./mapCategoryRowToBehavior";
import { mapCategoryRowToDeposit } from "./mapCategoryRowToDeposit";
import { mapCategoryRowToImage } from "./mapCategoryRowToImage";

export const mapCategoryRowToConfiguration = (
  categoryRow: EquipmentCategoryRow,
  currentQuantity: number,
  hasRecords: boolean
): CategoryConfiguration => ({
  id: categoryRow.id,
  name: categoryRow.name,
  status: categoryRow.status,
  currentQuantity,
  behavior: mapCategoryRowToBehavior(categoryRow),
  deposit: mapCategoryRowToDeposit(categoryRow),
  alerts: mapCategoryRowToAlerts(categoryRow),
  image: mapCategoryRowToImage(categoryRow),
  hasRecords,
});

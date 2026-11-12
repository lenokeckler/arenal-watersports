import type { EquipmentCategoryRow } from "./EquipmentCategoryRow.type";

export type CategoryImageRow = Pick<
  EquipmentCategoryRow,
  "id" | "name" | "image_path"
>;

import type { Database } from "@/app/types";

type EquipmentCategoryUpdate =
  Database["public"]["Tables"]["equipment_categories"]["Update"];

export type CategoryImageRowUpdate = Pick<
  EquipmentCategoryUpdate,
  "image_path" | "updated_by"
>;

import { Database } from "@/app/types";

type EquipmentCategoryUpdate =
  Database["public"]["Tables"]["equipment_categories"]["Update"];

export type CategoryDepositRowUpdate = Pick<
  EquipmentCategoryUpdate,
  "deposit_usd" | "deposit_crc" | "updated_by"
>;

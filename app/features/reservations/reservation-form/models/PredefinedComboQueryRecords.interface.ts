import type { Database } from "@/app/types";

export type PredefinedComboRecord = Pick<
  Database["public"]["Tables"]["combos"]["Row"],
  | "audience"
  | "id"
  | "name"
  | "package_price_crc"
  | "package_price_usd"
  | "status"
>;

export type PredefinedComboItemRecord = Pick<
  Database["public"]["Tables"]["combo_items"]["Row"],
  "category_id" | "combo_id" | "quantity"
>;

export type PredefinedComboCategoryRecord = Pick<
  Database["public"]["Tables"]["equipment_categories"]["Row"],
  | "id"
  | "is_reservable"
  | "name"
  | "status"
  | "units_are_interchangeable"
>;

export interface PredefinedComboQueryRecords {
  categories: PredefinedComboCategoryRecord[];
  comboItems: PredefinedComboItemRecord[];
  combos: PredefinedComboRecord[];
}

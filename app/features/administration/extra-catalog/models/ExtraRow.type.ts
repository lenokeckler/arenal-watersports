import type { Database, NullableRef } from "@/app/types";
import type { ExtraCompatibilityCountRow } from "./ExtraCompatibilityCountRow.interface";
import type { ExtraOccupiedCategoryRow } from "./ExtraOccupiedCategoryRow.interface";

export type ExtraRow = Pick<
  Database["public"]["Tables"]["extras"]["Row"],
  | "id"
  | "name"
  | "status"
  | "price_usd"
  | "price_crc"
  | "occupies_category_id"
  | "occupies_quantity"
> & {
  occupied_category: NullableRef<ExtraOccupiedCategoryRow>;
  extra_compatibility: ExtraCompatibilityCountRow[];
};

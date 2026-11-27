import type { Database } from "@/app/types";
import type { ExtraCompatibilityUnitRow } from "./ExtraCompatibilityUnitRow.type";

export type ExtraCompatibilityCategoryRow = Pick<
  Database["public"]["Tables"]["equipment_categories"]["Row"],
  "id" | "name"
> & {
  equipment_units: ExtraCompatibilityUnitRow[];
};

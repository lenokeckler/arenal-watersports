import type { Database } from "@/app/types";

export type ExtraCompatibilityUnitRow = Pick<
  Database["public"]["Tables"]["equipment_units"]["Row"],
  "id" | "code" | "status"
>;

import type { NullableRef } from "@/app/types";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import { mapCategoryRowToAlerts } from "../utils/mapCategoryRowToAlerts";
import { readCategoryRow } from "./readCategoryRow";

export const getCategoryAlerts = (
  categoryId: string
): Promise<NullableRef<CategoryAlerts>> =>
  readCategoryRow({
    query: (supabase) =>
      supabase
        .from("equipment_categories")
        .select("id, alert_min_quantity, alert_expiry_days")
        .eq("id", categoryId)
        .maybeSingle(),
    map: mapCategoryRowToAlerts,
    operation: "getCategoryAlerts",
  });

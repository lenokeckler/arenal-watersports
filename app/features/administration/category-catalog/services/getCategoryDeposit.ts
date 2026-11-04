import type { NullableRef } from "@/app/types";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import { mapCategoryRowToDeposit } from "../utils/mapCategoryRowToDeposit";
import { readCategoryRow } from "./readCategoryRow";

export const getCategoryDeposit = (
  categoryId: string
): Promise<NullableRef<CategoryDeposit>> =>
  readCategoryRow({
    query: (supabase) =>
      supabase
        .from("equipment_categories")
        .select("id, deposit_usd, deposit_crc")
        .eq("id", categoryId)
        .maybeSingle(),
    map: mapCategoryRowToDeposit,
    operation: "getCategoryDeposit",
  });

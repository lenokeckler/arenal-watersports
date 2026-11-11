import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";

export const getDamageReportUnits = async (): Promise<
  DamageReportUnit[]
> => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("equipment_units")
    .select("id, code, equipment_categories(name)")
    .order("code");

  throwIfSupabaseError(error, "get damage report units");

  if (!data) {
    return [];
  }

  return data.map((unit) => ({
    id: unit.id,
    code: unit.code,
    categoryName: unit.equipment_categories.name,
  }));
};

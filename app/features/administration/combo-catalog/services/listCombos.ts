import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { Combo } from "../models/Combo.interface";
import { mapComboRowToCombo } from "../utils/mapComboRowToCombo";
import { buildComboListQuery } from "./buildComboListQuery";

export const listCombos = async (): Promise<Combo[]> => {
  const supabase = await createServerSupabaseClient();

  const { data: comboRows, error } =
    await buildComboListQuery(supabase);
  throwIfSupabaseError(error, "listCombos");

  return (comboRows ?? []).map(mapComboRowToCombo);
};

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Money } from "@/app/utils/money/models/Money.interface";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";

export const insertIncomeMovement = async (
  supabase: SupabaseClient,
  table: string,
  row: Money & Record<string, unknown>,
  operation: string
): Promise<string> => {
  const { data, error } = await supabase
    .from(table)
    .insert(row)
    .select(E2E_SUPABASE_COLUMN.ID)
    .single();

  if (error) {
    return failE2eOperation(operation, error.message);
  }

  return data.id;
};

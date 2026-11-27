import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { ListPageRange } from "@/app/utils/list-pagination/models/ListPageRange.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_ROW_COLUMNS } from "../constants/ExtraQuery.constants";
import type { ExtraRow } from "../models/ExtraRow.type";

export const fetchExtras = async (
  supabase: ServerSupabaseClient,
  range: ListPageRange
): Promise<ExtraRow[]> => {
  const { data: extraRows, error } = await supabase
    .from("extras")
    .select(EXTRA_ROW_COLUMNS)
    .order("name", { ascending: true })
    .order("id", { ascending: true })
    .range(range.from, range.to);
  throwIfSupabaseError(error, "fetchExtras");

  return extraRows ?? [];
};

import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchUnitViewStatuses = async (
  supabase: ServerSupabaseClient,
  unitIds: string[]
): Promise<Map<string, string>> => {
  const { data: stateRows, error } = await supabase
    .from("unit_current_state")
    .select("id, effective_status")
    .in("id", unitIds);
  throwIfSupabaseError(error, "fetchUnitViewStatuses");

  const viewStatusById = new Map<string, string>();
  (stateRows ?? []).forEach((stateRow) => {
    if (stateRow.id && stateRow.effective_status) {
      viewStatusById.set(
        stateRow.id,
        stateRow.effective_status
      );
    }
  });

  return viewStatusById;
};

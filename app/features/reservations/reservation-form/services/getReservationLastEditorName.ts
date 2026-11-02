import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";

export const getReservationLastEditorName = async (
  supabase: SupabaseClient<Database>,
  workerId: string
): Promise<string> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_EDIT_QUERY.EDITOR_RPC,
    { p_worker_ids: [workerId] }
  );
  throwIfSupabaseError(
    error,
    RESERVATION_EDIT_QUERY.EDITOR_OPERATION
  );
  const editor = data?.[0];
  if (!editor) {
    throw new Error(RESERVATION_EDIT_QUERY.MISSING_EDITOR);
  }
  return editor.full_name;
};

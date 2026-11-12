import { OUT_ON_WATER_ERROR } from "../constants/OutOnWater.constants";
import type { DispatchedGroupOut } from "../models/DispatchedGroupOut.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";

export const getDispatchedGroupsOut = async (): Promise<
  DispatchedGroupOut[]
> => {
  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase.rpc(
    "dispatched_groups_out"
  );
  throwIfSupabaseError(
    error,
    OUT_ON_WATER_ERROR.LOAD_GROUPS
  );

  return (data ?? []).map((row) => ({
    categoryId: row.category_id,
    categoryName: row.category_name,
    code: row.code,
    customerName: row.customer_name,
    dispatchId: row.dispatch_id,
    dispatchedAt: row.dispatched_at,
    durationMinutes: row.duration_minutes,
    endsAt: row.ends_at,
    extendedMinutes: row.extended_minutes,
    quantity: row.quantity,
    reservationId: row.reservation_id,
    unitCodes: row.unit_codes,
  }));
};

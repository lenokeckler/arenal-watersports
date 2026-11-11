import { DISPATCH_SHEET_ERROR } from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import type { DispatchCandidateUnit } from "@/app/components/dispatch-board/models/DispatchCandidateUnit.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { PendingDispatchSupabaseClient } from "./models/PendingDispatchSupabaseClient.type";

export const readDispatchCandidateUnits = async (
  supabase: PendingDispatchSupabaseClient,
  reservationId: string,
  categoryId: string
): Promise<DispatchCandidateUnit[]> => {
  const { data, error } = await supabase.rpc(
    "dispatch_candidate_units",
    {
      p_category_id: categoryId,
      p_reservation_id: reservationId,
    }
  );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.LOAD_UNITS
  );

  return (data ?? []).map((unit) => ({
    code: unit.code,
    fuelLevel: unit.fuel_level,
    fuelMax: unit.fuel_max,
    isAssigned: unit.is_assigned,
    unitId: unit.unit_id,
    usageTotal: unit.usage_total,
  }));
};

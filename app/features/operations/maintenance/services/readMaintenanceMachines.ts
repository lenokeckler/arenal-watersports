import type { EquipmentSupabaseClient } from "@/app/services/equipment/models/EquipmentSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { MAINTENANCE_ERROR } from "../constants/Maintenance.constants";
import type { MaintenanceMachine } from "../models/MaintenanceMachine.interface";

export const readMaintenanceMachines = async (
  supabase: EquipmentSupabaseClient
): Promise<MaintenanceMachine[]> => {
  const { data, error } = await supabase
    .from("equipment_units")
    .select(
      "id, code, category:equipment_categories!inner(has_motor)"
    )
    .eq("category.has_motor", true)
    .neq("status", "decommissioned")
    .order("code");
  throwIfSupabaseError(
    error,
    MAINTENANCE_ERROR.LOAD_MACHINES
  );

  return (data ?? []).map(({ code, id }) => ({ code, id }));
};

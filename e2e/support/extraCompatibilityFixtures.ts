import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const findUnitIds = async (
  unitCodes: string[]
): Promise<string[]> => {
  const { data, error } =
    await createServiceRoleSupabaseClient()
      .from("equipment_units")
      .select("id")
      .in("code", unitCodes);
  throwIfSupabaseError(error, "findUnitIds");

  return (data ?? []).map((row) => row.id);
};

export const linkExtraToUnitCodes = async (
  extraId: string,
  unitCodes: string[]
): Promise<void> => {
  const unitIds = await findUnitIds(unitCodes);

  const { error } = await createServiceRoleSupabaseClient()
    .from("extra_compatibility")
    .insert(
      unitIds.map((unitId) => ({
        extra_id: extraId,
        unit_id: unitId,
      }))
    );
  throwIfSupabaseError(error, "linkExtraToUnitCodes");
};

export const removeExtraLinks = async (
  extraIds: string[]
): Promise<void> => {
  const { error } = await createServiceRoleSupabaseClient()
    .from("extra_compatibility")
    .delete()
    .in("extra_id", extraIds);
  throwIfSupabaseError(error, "removeExtraLinks");
};

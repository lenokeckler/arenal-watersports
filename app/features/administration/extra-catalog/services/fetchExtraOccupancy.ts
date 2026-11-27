import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_OCCUPANCY_COLUMNS } from "../constants/ExtraQuery.constants";
import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";

export const fetchExtraOccupancy = async (
  supabase: ServerSupabaseClient,
  extraId: string
): Promise<NullableRef<ExtraOccupancyColumns>> => {
  const { data: occupancyRow, error } = await supabase
    .from("extras")
    .select(EXTRA_OCCUPANCY_COLUMNS)
    .eq("id", extraId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "fetchExtraOccupancy");

  return occupancyRow;
};

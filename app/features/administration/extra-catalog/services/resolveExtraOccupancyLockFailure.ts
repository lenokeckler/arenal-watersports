import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";
import { hasExtraOccupancyChanged } from "../utils/hasExtraOccupancyChanged";
import { fetchExtraOccupancy } from "./fetchExtraOccupancy";
import { isExtraUsedInReservations } from "./isExtraUsedInReservations";

export const resolveExtraOccupancyLockFailure = async (
  supabase: ServerSupabaseClient,
  extraId: string,
  occupancyColumns: ExtraOccupancyColumns
): Promise<NullableRef<ExtraMutationResult>> => {
  const currentOccupancy = await fetchExtraOccupancy(
    supabase,
    extraId
  );
  if (
    !currentOccupancy ||
    !hasExtraOccupancyChanged(
      currentOccupancy,
      occupancyColumns
    ) ||
    !(await isExtraUsedInReservations(supabase, extraId))
  ) {
    return null;
  }

  return {
    status: EXTRA_MUTATION_STATUS.ERROR,
    occupancyError: EXTRA_OCCUPANCY_COPY.LOCKED_ERROR,
  };
};

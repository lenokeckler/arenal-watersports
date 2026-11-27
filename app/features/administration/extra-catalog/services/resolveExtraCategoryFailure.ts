import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraOccupancyColumns } from "../models/ExtraOccupancyColumns.interface";
import { isOccupiableCategory } from "./isOccupiableCategory";

export const resolveExtraCategoryFailure = async (
  supabase: ServerSupabaseClient,
  occupancyColumns: ExtraOccupancyColumns
): Promise<NullableRef<ExtraMutationResult>> => {
  const categoryId = occupancyColumns.occupies_category_id;
  if (
    !categoryId ||
    (await isOccupiableCategory(supabase, categoryId))
  ) {
    return null;
  }

  return {
    status: EXTRA_MUTATION_STATUS.ERROR,
    occupancyError: EXTRA_OCCUPANCY_COPY.CATEGORY_ERROR,
  };
};

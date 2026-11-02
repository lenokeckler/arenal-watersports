import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { getReservationInterval } from "../utils/getReservationInterval";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const CATEGORY_CONFLICTS_OPERATION =
  "load reservation category conflicts";
const CATEGORY_CONFLICTS_MISSING_RESULT =
  "Reservation category conflicts returned no result.";

export const getReservationCategoryConflicts = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryConflict[]> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const interval = getReservationInterval(input);
  const { data, error } = await supabase.rpc(
    "reservation_category_conflicts",
    {
      p_category_id: input.categoryId,
      p_ends_at: interval.endsAt,
      p_exclude_reservation: input.excludeReservationId,
      p_starts_at: interval.startsAt,
    }
  );

  throwIfSupabaseError(error, CATEGORY_CONFLICTS_OPERATION);
  if (!data) {
    throw new Error(CATEGORY_CONFLICTS_MISSING_RESULT);
  }

  return data;
};

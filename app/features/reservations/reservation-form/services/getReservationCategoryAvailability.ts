import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.type";
import { getReservationInterval } from "../utils/getReservationInterval";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const CATEGORY_AVAILABILITY_OPERATION =
  "load reservation category availability";
const CATEGORY_AVAILABILITY_MISSING_RESULT =
  "Reservation category availability returned no result.";

export const getReservationCategoryAvailability = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryAvailability> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const interval = getReservationInterval(input);
  const { data, error } = await supabase.rpc(
    "category_availability",
    {
      p_category_id: input.categoryId,
      p_ends_at: interval.endsAt,
      p_starts_at: interval.startsAt,
    }
  );

  throwIfSupabaseError(
    error,
    CATEGORY_AVAILABILITY_OPERATION
  );
  const availability = data?.[0];
  if (!availability) {
    throw new Error(CATEGORY_AVAILABILITY_MISSING_RESULT);
  }

  return availability;
};

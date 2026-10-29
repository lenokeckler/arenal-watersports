import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EMPTY_RESERVATION_CATEGORY_AVAILABILITY } from "../constants/ReservationCategoryAvailability.constants";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableConcreteReservationUnits } from "./getAvailableConcreteReservationUnits";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { getReservationWindow } from "../utils/getReservationWindow";

const loadCategory = async (
  supabase: SupabaseClient<Database>,
  categoryId: string
) => {
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("id, units_are_interchangeable")
    .eq("id", categoryId)
    .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
    .eq("is_reservable", true)
    .maybeSingle();
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.CATEGORY
  );
  return data;
};

const loadAvailableQuantity = async (
  supabase: SupabaseClient<Database>,
  categoryId: string,
  startsAt: string,
  endsAt: string
): Promise<number> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_AVAILABILITY.RPC.CATEGORY,
    {
      p_category_id: categoryId,
      p_ends_at: endsAt,
      p_starts_at: startsAt,
    }
  );
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.CATEGORY
  );
  return Math.max(0, data?.[0]?.free ?? 0);
};

const getAvailableQuantity = (
  isInterchangeable: boolean,
  freeCategoryQuantity: number,
  availableUnitCount: number
): number =>
  isInterchangeable
    ? freeCategoryQuantity
    : availableUnitCount;

export const getAvailableReservationUnits = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryAvailability> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const category = await loadCategory(
    supabase,
    input.categoryId
  );
  if (!category) {
    return EMPTY_RESERVATION_CATEGORY_AVAILABILITY;
  }

  const { startsAt, endsAt } = getReservationWindow(input);
  const [freeQuantity, availableUnits] = await Promise.all([
    loadAvailableQuantity(
      supabase,
      input.categoryId,
      startsAt,
      endsAt
    ),
    category.units_are_interchangeable
      ? Promise.resolve([])
      : getAvailableConcreteReservationUnits(
          supabase,
          input.categoryId,
          startsAt,
          endsAt
        ),
  ]);
  const availableQuantity = getAvailableQuantity(
    category.units_are_interchangeable,
    freeQuantity,
    availableUnits.length
  );

  return {
    availableQuantity,
    availableUnits,
    hasRequestedQuantity:
      availableQuantity >= input.quantity,
  };
};

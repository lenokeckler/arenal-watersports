import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableConcreteReservationUnits } from "./getAvailableConcreteReservationUnits";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { getReservationWindow } from "../utils/getReservationWindow";

const isReservableConcreteCategory = async (
  supabase: SupabaseClient<Database>,
  categoryId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("id")
    .eq("id", categoryId)
    .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
    .eq("is_reservable", true)
    .eq("units_are_interchangeable", false)
    .maybeSingle();
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.CATEGORY
  );
  return data !== null;
};

export const getAvailableReservationUnits = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryUnitOption[]> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  if (
    !(await isReservableConcreteCategory(
      supabase,
      input.categoryId
    ))
  ) {
    return [];
  }
  const { startsAt, endsAt } = getReservationWindow(input);
  return getAvailableConcreteReservationUnits(
    supabase,
    input.categoryId,
    startsAt,
    endsAt
  );
};

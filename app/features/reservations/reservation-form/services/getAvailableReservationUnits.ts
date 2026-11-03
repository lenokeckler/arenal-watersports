import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY,
  RESERVATION_AVAILABILITY,
} from "../constants/ReservationAvailability.constants";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableConcreteReservationUnits } from "./getAvailableConcreteReservationUnits";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { getReservationInterval } from "../utils/getReservationInterval";

const getAvailableCategoryQuantity = async (
  supabase: SupabaseClient<Database>,
  categoryId: string,
  window: ReturnType<typeof getReservationInterval>
): Promise<number> => {
  const { data, error } = await supabase.rpc(
    RESERVATION_AVAILABILITY.RPC.CATEGORY_AVAILABILITY,
    {
      p_category_id: categoryId,
      p_ends_at: window.endsAt,
      p_starts_at: window.startsAt,
    }
  );
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.CATEGORY_AVAILABILITY
  );
  const availability = data?.[0];
  if (
    !availability ||
    typeof availability.free !== "number"
  ) {
    throw new Error(
      RESERVATION_AVAILABILITY.ERROR
        .CATEGORY_AVAILABILITY_MISSING
    );
  }
  return availability.free;
};

export const getAvailableReservationUnits = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationEquipmentAvailability> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const { data: category, error } = await supabase
    .from("equipment_categories")
    .select("id, units_are_interchangeable")
    .eq("id", input.categoryId)
    .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
    .eq("is_reservable", true)
    .maybeSingle();
  throwIfSupabaseError(
    error,
    RESERVATION_AVAILABILITY.OPERATION.CATEGORY
  );
  if (!category) {
    return EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY;
  }
  const window = getReservationInterval(input);
  if (category.units_are_interchangeable) {
    const availableQuantity =
      await getAvailableCategoryQuantity(
        supabase,
        input.categoryId,
        window
      );
    return {
      availableQuantity,
      availableUnits: [],
    };
  }
  const availableUnits =
    await getAvailableConcreteReservationUnits(
      supabase,
      input.categoryId,
      window.startsAt,
      window.endsAt
    );
  return {
    availableQuantity: null,
    availableUnits,
  };
};

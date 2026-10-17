import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import { RESERVATION_EQUIPMENT_UNIT_STATUS } from "../constants/ReservationEquipmentUnitStatus.constants";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

const AVAILABILITY_CATEGORY_OPERATION =
  "check reservation unit category";
const AVAILABILITY_UNIT_OPERATION =
  "load available reservation units";
const AVAILABILITY_CONFLICT_OPERATION =
  "check reservation unit conflicts";

const getReservationWindow = (
  input: ReservationUnitAvailabilityInput
) => {
  const start = new Date(
    `${input.date}T${input.time}:00${RESERVATION_AVAILABILITY.COSTA_RICA_OFFSET}`
  );
  const end = new Date(
    start.getTime() +
      input.durationMinutes *
        RESERVATION_AVAILABILITY.MILLISECONDS_PER_MINUTE
  );

  return {
    endsAt: end.toISOString(),
    startsAt: start.toISOString(),
  };
};

const getCategoryUnits = async (
  supabase: SupabaseClient<Database>,
  categoryId: string
): Promise<ReservationCategoryUnitOption[]> => {
  const { data: category, error: categoryError } =
    await supabase
      .from("equipment_categories")
      .select("id")
      .eq("id", categoryId)
      .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
      .eq("is_reservable", true)
      .eq("units_are_interchangeable", false)
      .maybeSingle();
  throwIfSupabaseError(
    categoryError,
    AVAILABILITY_CATEGORY_OPERATION
  );
  if (!category) {
    return [];
  }

  const { data, error } = await supabase
    .from("equipment_units")
    .select("id, code")
    .eq("category_id", categoryId)
    .eq(
      "status",
      RESERVATION_EQUIPMENT_UNIT_STATUS.AVAILABLE
    )
    .order("code");
  throwIfSupabaseError(error, AVAILABILITY_UNIT_OPERATION);

  return data ?? [];
};

export const getAvailableReservationUnits = async (
  input: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryUnitOption[]> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const units = await getCategoryUnits(
    supabase,
    input.categoryId
  );
  const window = getReservationWindow(input);
  const checkedUnits = await Promise.all(
    units.map(async (unit) => {
      const { data, error } = await supabase.rpc(
        "unit_conflicts",
        {
          p_ends_at: window.endsAt,
          p_starts_at: window.startsAt,
          p_unit_id: unit.id,
        }
      );
      throwIfSupabaseError(
        error,
        AVAILABILITY_CONFLICT_OPERATION
      );
      return data?.length === 0 ? unit : null;
    })
  );

  return checkedUnits.filter(
    (unit): unit is ReservationCategoryUnitOption =>
      unit !== null
  );
};

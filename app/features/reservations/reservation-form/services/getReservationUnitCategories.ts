import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import type { ReservationUnitCategoryOption } from "../models/ReservationUnitCategoryOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

const RESERVATION_UNIT_CATEGORY_OPERATION =
  "load reservation unit categories";

export const getReservationUnitCategories =
  async (): Promise<ReservationUnitCategoryOption[]> => {
    const supabase =
      await getAuthorizedReservationFormClient();
    const { data, error } = await supabase
      .from("equipment_categories")
      .select("id, name")
      .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
      .eq("is_reservable", true)
      .eq("tracking_mode", INVENTORY_TRACKING_MODE.BY_UNIT)
      .eq("units_are_interchangeable", false)
      .order("name");

    throwIfSupabaseError(
      error,
      RESERVATION_UNIT_CATEGORY_OPERATION
    );

    return data ?? [];
  };

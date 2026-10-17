import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { RESERVATION_CATEGORY_STATUS } from "../constants/ReservationCategoryStatus.constants";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

const RESERVATION_CATEGORY_OPERATION =
  "load reservation categories";

export const getReservationCategories = async (): Promise<
  ReservationCategoryOption[]
> => {
  const supabase: SupabaseClient<Database> =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("id, name, units_are_interchangeable")
    .eq("status", RESERVATION_CATEGORY_STATUS.ACTIVE)
    .eq("is_reservable", true)
    .order("name");

  throwIfSupabaseError(
    error,
    RESERVATION_CATEGORY_OPERATION
  );

  return (data ?? []).map((category) => ({
    id: category.id,
    isInterchangeable: category.units_are_interchangeable,
    name: category.name,
  }));
};

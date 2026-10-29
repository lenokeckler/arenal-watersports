import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

const RESERVATION_CATEGORY_OPERATION =
  "load reservation categories";

export const getReservationCategories = async (): Promise<
  ReservationCategoryOption[]
> => {
  const supabase =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase
    .from("equipment_categories")
    .select("id, name")
    .eq("status", "active")
    .eq("is_reservable", true)
    .eq("units_are_interchangeable", true)
    .order("name");

  throwIfSupabaseError(
    error,
    RESERVATION_CATEGORY_OPERATION
  );

  return data ?? [];
};

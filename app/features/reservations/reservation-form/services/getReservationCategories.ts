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
  const { data, error } = await supabase.rpc(
    "reservable_equipment_categories"
  );

  throwIfSupabaseError(
    error,
    RESERVATION_CATEGORY_OPERATION
  );

  return data ?? [];
};

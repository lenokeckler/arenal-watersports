import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

const RESERVATION_CATEGORY_OPERATION =
  "load reservation categories";

export const getReservationCategories = async (): Promise<
  ReservationCategoryOption[]
> => {
  const supabase: SupabaseClient<Database> =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase.rpc(
    "reservable_equipment_categories" as never
  );

  throwIfSupabaseError(
    error,
    RESERVATION_CATEGORY_OPERATION
  );

  const categories = (data ?? []) as unknown as Array<{
    id: string;
    name: string;
    units_are_interchangeable: boolean;
  }>;
  return categories.map((category) => ({
    id: category.id,
    isInterchangeable: category.units_are_interchangeable,
    name: category.name,
  }));
};

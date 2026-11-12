import { DISPATCH_SHEET_ERROR } from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import type { CategoryDispatchReservation } from "@/app/components/dispatch-board/models/CategoryDispatchReservation.interface";
import { getCostaRicaDayRange } from "@/app/components/dispatch-board/utils/getCostaRicaDayRange";
import { UUID_PATTERN } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { getOperationsSupabaseClient } from "./getOperationsSupabaseClient";

export const getCategoryDispatchReservations = async (
  categoryId: string,
  currentDate: Date = new Date()
): Promise<CategoryDispatchReservation[]> => {
  if (!UUID_PATTERN.test(categoryId)) {
    throw new RangeError(
      DISPATCH_SHEET_ERROR.INVALID_INPUT
    );
  }

  const supabase = await getOperationsSupabaseClient();
  const { startsAt, endsAt } =
    getCostaRicaDayRange(currentDate);
  const { data, error } = await supabase.rpc(
    "category_dispatch_reservations",
    {
      p_category_id: categoryId,
      p_day_end: endsAt,
      p_day_start: startsAt,
    }
  );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.LOAD_CATEGORY_RESERVATIONS
  );

  return (data ?? []).map((row) => ({
    code: row.code,
    customerName: row.customer_name,
    peopleCount: row.people_count,
    requiredCount: row.required_count,
    reservationId: row.reservation_id,
    startsAt: row.starts_at,
  }));
};

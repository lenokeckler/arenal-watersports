import {
  RESERVATION_HISTORY_OPERATION,
  RESERVATION_HISTORY_QUERY,
  SUPABASE_TABLE,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReservationHistoryCategoryOption } from "./models/ReservationHistoryCategoryOption.interface";

export const readReservationHistoryCategoryOptions =
  async (): Promise<
    readonly ReservationHistoryCategoryOption[]
  > => {
    await assertActiveWorkModeAccess();
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
      .select(
        RESERVATION_HISTORY_QUERY.CATEGORY_OPTIONS.COLUMNS
      )
      .order(
        RESERVATION_HISTORY_QUERY.CATEGORY_OPTIONS.ORDER_BY
      );
    throwIfSupabaseError(
      error,
      RESERVATION_HISTORY_OPERATION.CATEGORY_OPTIONS
    );
    return data ?? [];
  };

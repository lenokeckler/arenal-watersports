import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { getCostaRicaDayRange } from "@/app/components/dispatch-board/utils/getCostaRicaDayRange";
import { DISPATCH_SHEET_ERROR } from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { getOperationsSupabaseClient } from "./getOperationsSupabaseClient";

export const getPendingDispatchCount = async (
  currentDate: Date = new Date()
): Promise<number> => {
  const supabase = await getOperationsSupabaseClient();
  const { startsAt, endsAt } =
    getCostaRicaDayRange(currentDate);
  const { data, error } = await supabase.rpc(
    "pending_dispatch_reservations",
    {
      p_ends_at: endsAt,
      p_limit: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
      p_offset: 0,
      p_starts_at: startsAt,
    }
  );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.COUNT_PENDING
  );

  return data?.length ?? 0;
};

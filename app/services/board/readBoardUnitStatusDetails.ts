import {
  BOARD_UNIT_STATUS_DETAILS_OPERATION,
  BOARD_UNIT_STATUS_DETAILS_QUERY,
  LENGTH,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardUnitStatusDetailsRows } from "./models/BoardUnitStatusDetailsRows.interface";
import { requireBoardSupabase } from "./requireBoardSupabase";

export const readBoardUnitStatusDetails = async (
  unitIds: string[]
): Promise<BoardUnitStatusDetailsRows> => {
  if (unitIds.length === LENGTH.ZERO) {
    return { damages: [], jobs: [] };
  }

  const supabase = await requireBoardSupabase();
  const { DAMAGE, JOBS, UNIT_COLUMN } =
    BOARD_UNIT_STATUS_DETAILS_QUERY;

  const [jobs, damages] = await Promise.all([
    supabase
      .from(JOBS.TABLE)
      .select(JOBS.PROJECTION)
      .in(UNIT_COLUMN, unitIds)
      .order(JOBS.ORDER_BY, { ascending: false }),
    supabase
      .from(DAMAGE.TABLE)
      .select(DAMAGE.PROJECTION)
      .in(UNIT_COLUMN, unitIds)
      .order(DAMAGE.ORDER_BY, { ascending: false }),
  ]);

  throwIfSupabaseError(
    jobs.error,
    BOARD_UNIT_STATUS_DETAILS_OPERATION
  );
  throwIfSupabaseError(
    damages.error,
    BOARD_UNIT_STATUS_DETAILS_OPERATION
  );

  return {
    damages: damages.data ?? [],
    jobs: jobs.data ?? [],
  };
};

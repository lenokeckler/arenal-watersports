import {
  DISPATCH_GROUP_STATUS,
  DISPATCH_SHEET_DATABASE_ERROR,
  DISPATCH_SHEET_ERROR,
} from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import type { DispatchGroupInput } from "@/app/components/dispatch-board/models/DispatchGroupInput.interface";
import type { DispatchGroupResult } from "@/app/components/dispatch-board/models/DispatchGroupResult.interface";
import { validateDispatchGroupInput } from "@/app/components/dispatch-board/utils/validateDispatchGroupInput";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getOperationsSupabaseClient } from "./getOperationsSupabaseClient";

const UNAVAILABLE_CODES: readonly string[] = [
  DISPATCH_SHEET_DATABASE_ERROR.INVALID_SELECTION,
  DISPATCH_SHEET_DATABASE_ERROR.UNIT_OUT,
];

export const dispatchReservationGroup = async (
  input: DispatchGroupInput
): Promise<DispatchGroupResult> => {
  validateDispatchGroupInput(input);

  const supabase = await getOperationsSupabaseClient();
  const { error } = await supabase.rpc(
    "dispatch_reservation_group",
    {
      p_category_id: input.categoryId,
      p_dispatched_at: input.departureAt,
      p_readings: input.readings.map((reading) => ({
        fuel: reading.fuel,
        unit_id: reading.unitId,
        usage: reading.usage,
      })),
      p_reservation_id: input.reservationId,
      p_returns_at: input.returnsAt,
      p_unit_ids: input.unitIds,
    }
  );

  if (!error) {
    return { status: DISPATCH_GROUP_STATUS.DISPATCHED };
  }

  if (
    error.code ===
    DISPATCH_SHEET_DATABASE_ERROR.ALREADY_DISPATCHED
  ) {
    return {
      status: DISPATCH_GROUP_STATUS.ALREADY_DISPATCHED,
    };
  }

  if (
    error.code ===
    DISPATCH_SHEET_DATABASE_ERROR.INVALID_READINGS
  ) {
    return {
      status: DISPATCH_GROUP_STATUS.INVALID_READINGS,
    };
  }

  if (UNAVAILABLE_CODES.includes(error.code)) {
    return { status: DISPATCH_GROUP_STATUS.UNAVAILABLE };
  }

  throw new SupabaseQueryError(
    DISPATCH_SHEET_ERROR.DISPATCH_GROUP,
    error
  );
};

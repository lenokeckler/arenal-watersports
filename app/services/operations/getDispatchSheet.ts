import {
  DISPATCH_SHEET_ERROR,
  DISPATCH_TRACKING_MODE,
} from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import type { DispatchSheetGroup } from "@/app/components/dispatch-board/models/DispatchSheetGroup.interface";
import { UUID_PATTERN } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { getOperationsSupabaseClient } from "./getOperationsSupabaseClient";
import { readDispatchCandidateUnits } from "./readDispatchCandidateUnits";

export const getDispatchSheet = async (
  reservationId: string
): Promise<DispatchSheetGroup[]> => {
  if (!UUID_PATTERN.test(reservationId)) {
    throw new RangeError(
      DISPATCH_SHEET_ERROR.INVALID_INPUT
    );
  }

  const supabase = await getOperationsSupabaseClient();
  const { data, error } = await supabase.rpc(
    "reservation_dispatch_groups",
    { p_reservation_id: reservationId }
  );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.LOAD_GROUPS
  );

  return Promise.all(
    (data ?? []).map(async (group) => {
      const isTrackedByUnit =
        group.tracking_mode ===
        DISPATCH_TRACKING_MODE.BY_UNIT;

      return {
        candidateUnits: isTrackedByUnit
          ? await readDispatchCandidateUnits(
              supabase,
              reservationId,
              group.category_id
            )
          : [],
        categoryId: group.category_id,
        categoryName: group.category_name,
        consumesFuel: group.consumes_fuel,
        durationMinutes: group.duration_minutes,
        fixedUnitIds: group.fixed_unit_ids,
        hasMotor: group.has_motor,
        isTrackedByUnit,
        requiredQuantity: group.required_quantity,
        usageMetric: group.usage_metric,
      };
    })
  );
};

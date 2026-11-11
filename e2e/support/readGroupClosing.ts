import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DISPATCH_SHEET_ERROR,
  E2E_DISPATCH_SHEET_TABLE,
} from "../constants/E2eDispatchSheet.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { GroupClosingState } from "./models/DispatchSheetFixture.interface";

export const readGroupClosing = async (
  supabase: SupabaseClient,
  reservationId: string,
  unitCodes: string[]
): Promise<GroupClosingState> => {
  const dispatches = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DISPATCHES)
    .select("closed_at")
    .eq("reservation_id", reservationId)
    .single();
  const reservation = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.RESERVATIONS)
    .select("status")
    .eq("id", reservationId)
    .single();
  const damage = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.DAMAGE_REPORTS)
    .select("id", { count: "exact", head: true })
    .eq("reservation_id", reservationId);
  const units = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.UNITS)
    .select("id, code, status, fuel_level, usage_total")
    .in("code", unitCodes);
  const items = await supabase
    .from(E2E_DISPATCH_SHEET_TABLE.ITEMS)
    .select("unit_id, fuel_in, usage_in")
    .eq("reservation_id", reservationId)
    .not("unit_id", "is", null);
  const failure =
    dispatches.error ??
    reservation.error ??
    damage.error ??
    units.error ??
    items.error;

  if (failure) {
    return failE2eOperation(
      E2E_DISPATCH_SHEET_ERROR.OPERATION_READ_CLOSING,
      failure.message
    );
  }

  return {
    closedAt: dispatches.data?.closed_at ?? null,
    damageReports: damage.count ?? 0,
    reservationStatus: reservation.data?.status ?? "",
    units: Object.fromEntries(
      (units.data ?? []).map((unit) => {
        const item = (items.data ?? []).find(
          (row) => row.unit_id === unit.id
        );

        return [
          unit.code,
          {
            fuelIn: item?.fuel_in ?? null,
            fuelLevel: unit.fuel_level,
            status: unit.status,
            usageIn:
              item?.usage_in === null ||
              item?.usage_in === undefined
                ? null
                : Number(item.usage_in),
            usageTotal: Number(unit.usage_total),
          },
        ];
      })
    ),
  };
};

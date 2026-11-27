import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  DAMAGE_REPORT_OPERATION,
  DAMAGE_REPORT_QUERY,
} from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportClient } from "../models/DamageReportClient.type";
import type { DamageReportUnit } from "../models/DamageReportUnit.interface";
import { buildDamageReportUnits } from "../utils/buildDamageReportUnits";
import { buildTripsSince } from "../utils/buildTripsSince";

export const readDamageReportUnits = async (
  supabase: DamageReportClient
): Promise<DamageReportUnit[]> => {
  const [units, trips, open] = await Promise.all([
    supabase
      .from("equipment_units")
      .select(DAMAGE_REPORT_QUERY.UNIT_COLUMNS)
      .neq("status", "decommissioned")
      .order("code"),
    supabase
      .from("reservation_items")
      .select(DAMAGE_REPORT_QUERY.TRIP_COLUMNS)
      .not("unit_id", "is", null)
      .gte("dispatch.dispatched_at", buildTripsSince()),
    supabase
      .from("reservation_items")
      .select(DAMAGE_REPORT_QUERY.OPEN_COLUMNS)
      .not("unit_id", "is", null)
      .is("dispatch.closed_at", null),
  ]);
  [units.error, trips.error, open.error].forEach((error) =>
    throwIfSupabaseError(
      error,
      DAMAGE_REPORT_OPERATION.LOAD
    )
  );

  return buildDamageReportUnits(
    units.data ?? [],
    trips.data ?? [],
    open.data ?? [],
    DAMAGE_REPORT_COPY.TRIP_OPTION
  );
};

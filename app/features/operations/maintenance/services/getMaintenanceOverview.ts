import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MAINTENANCE_AVAILABLE_STATUS,
  MAINTENANCE_ERROR,
} from "../constants/Maintenance.constants";
import type { MaintenanceOverview } from "../models/MaintenanceOverview.interface";
import type { MaintenanceUnit } from "../models/MaintenanceUnit.interface";

export const getMaintenanceOverview =
  async (): Promise<MaintenanceOverview> => {
    const supabase = await getOperationsSupabaseClient();
    const { data, error } = await supabase.rpc(
      "maintenance_units"
    );
    throwIfSupabaseError(
      error,
      MAINTENANCE_ERROR.LOAD_UNITS
    );

    const units: MaintenanceUnit[] = (data ?? []).map(
      (row) => ({
        categoryId: row.category_id,
        categoryName: row.category_name,
        code: row.code,
        nextOilChangeAt:
          row.next_oil_change_at === null
            ? null
            : Number(row.next_oil_change_at),
        oilOverage:
          row.oil_overage === null
            ? null
            : Number(row.oil_overage),
        status: row.status,
        unitId: row.unit_id,
        usageMetric: row.usage_metric,
        usageTotal: Number(row.usage_total),
      })
    );

    return {
      oilDue: units.filter(
        (unit) => unit.oilOverage !== null
      ),
      outOfService: units.filter(
        (unit) =>
          unit.status !== MAINTENANCE_AVAILABLE_STATUS
      ),
    };
  };

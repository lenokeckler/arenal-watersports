import { createServerSupabaseClient } from "@/app/services/supabase";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MAINTENANCE_COST_ERROR,
  MAINTENANCE_COST_LIMITS,
} from "../constants/MaintenanceCostReport.constants";
import type { UnitMaintenanceCost } from "../models/UnitMaintenanceCost.interface";
import { groupCostsByUnit } from "../utils/groupCostsByUnit";

export class MaintenanceCostAccessError extends Error {
  constructor() {
    super(MAINTENANCE_COST_ERROR.NOT_ADMINISTRATOR);
    this.name = "MaintenanceCostAccessError";
  }
}

export const getMaintenanceCostByUnit = async (): Promise<
  UnitMaintenanceCost[]
> => {
  if (!(await isAdministratorSignedIn())) {
    throw new MaintenanceCostAccessError();
  }

  const supabase = await createServerSupabaseClient();
  const costs = await supabase
    .from("maintenance_cost_by_unit")
    .select(
      "unit_id, unit_code, category_id, currency, total_cost, records_count, last_performed_at"
    )
    .limit(MAINTENANCE_COST_LIMITS.ROWS_MAX);
  throwIfSupabaseError(
    costs.error,
    MAINTENANCE_COST_ERROR.LOAD_COSTS
  );

  const categories = await supabase
    .from("equipment_categories")
    .select("id, name");
  throwIfSupabaseError(
    categories.error,
    MAINTENANCE_COST_ERROR.LOAD_CATEGORIES
  );

  return groupCostsByUnit(
    (costs.data ?? []).flatMap((row) =>
      row.unit_id === null ||
      row.unit_code === null ||
      row.category_id === null ||
      row.currency === null ||
      row.last_performed_at === null
        ? []
        : [
            {
              categoryId: row.category_id,
              currency: row.currency,
              lastPerformedAt: row.last_performed_at,
              recordsCount: row.records_count ?? 0,
              totalCost: Number(row.total_cost ?? 0),
              unitCode: row.unit_code,
              unitId: row.unit_id,
            },
          ]
    ),
    Object.fromEntries(
      (categories.data ?? []).map((category) => [
        category.id,
        category.name,
      ])
    )
  );
};

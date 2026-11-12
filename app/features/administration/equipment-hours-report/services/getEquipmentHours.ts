import { createServerSupabaseClient } from "@/app/services/supabase";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  EQUIPMENT_HOURS_ERROR,
  EQUIPMENT_HOURS_LIMITS,
} from "../constants/EquipmentHoursReport.constants";
import type { EquipmentHoursPage } from "../models/EquipmentHoursPage.interface";
import { groupEquipmentHours } from "../utils/groupEquipmentHours";

export class EquipmentHoursAccessError extends Error {
  constructor() {
    super(EQUIPMENT_HOURS_ERROR.NOT_ADMINISTRATOR);
    this.name = "EquipmentHoursAccessError";
  }
}

export const getEquipmentHours = async (
  page: number
): Promise<EquipmentHoursPage> => {
  if (!(await isAdministratorSignedIn())) {
    throw new EquipmentHoursAccessError();
  }

  const supabase = await createServerSupabaseClient();
  const { from, to } = resolveListPageRange(
    page,
    EQUIPMENT_HOURS_LIMITS.CATEGORIES_PER_PAGE
  );
  const categories = await supabase
    .from("equipment_categories")
    .select("id", { count: "exact" })
    .eq("status", "active")
    .eq("tracking_mode", "by_unit")
    .order("name")
    .range(from, to);

  throwIfSupabaseError(
    categories.error,
    EQUIPMENT_HOURS_ERROR.LOAD_CATEGORIES
  );

  const pageCount = resolveListPageCount(
    categories.count ?? 0,
    EQUIPMENT_HOURS_LIMITS.CATEGORIES_PER_PAGE
  );
  const categoryIds = (categories.data ?? []).map(
    ({ id }) => id
  );

  if (categoryIds.length === 0) {
    return { categories: [], pageCount };
  }

  const { data, error } = await supabase
    .from("equipment_usage_hours")
    .select(
      "unit_id, unit_code, category_id, category_name, hours_used, dispatch_count, last_dispatched_at"
    )
    .in("category_id", categoryIds)
    .limit(EQUIPMENT_HOURS_LIMITS.UNITS_MAX);

  throwIfSupabaseError(
    error,
    EQUIPMENT_HOURS_ERROR.LOAD_HOURS
  );

  return {
    categories: groupEquipmentHours(
      (data ?? []).flatMap((row) =>
        row.unit_id === null ||
        row.unit_code === null ||
        row.category_id === null ||
        row.category_name === null
          ? []
          : [
              {
                categoryId: row.category_id,
                categoryName: row.category_name,
                code: row.unit_code,
                dispatchCount: row.dispatch_count ?? 0,
                hours: Number(row.hours_used ?? 0),
                lastDispatchedAt: row.last_dispatched_at,
                unitId: row.unit_id,
              },
            ]
      )
    ),
    pageCount,
  };
};

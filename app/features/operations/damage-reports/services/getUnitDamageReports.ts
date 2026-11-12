import { UUID_PATTERN } from "@/app/constants";
import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  DAMAGE_REPORTS_ERROR,
  DAMAGE_REPORTS_PAGINATION,
} from "../constants/DamageReports.constants";
import type { DamageReportsPage } from "../models/DamageReportsPage.interface";

export const getUnitDamageReports = async (
  unitId: string,
  page: number
): Promise<DamageReportsPage> => {
  const supabase = await getOperationsSupabaseClient();
  const missingUnit: DamageReportsPage = {
    entries: [],
    hasNextPage: false,
    page,
    unit: null,
  };

  if (!UUID_PATTERN.test(unitId)) {
    return missingUnit;
  }

  const { data: unit, error: unitError } = await supabase
    .from("equipment_units")
    .select(
      "id, code, impact_count, category:equipment_categories(name)"
    )
    .eq("id", unitId)
    .maybeSingle();
  throwIfSupabaseError(
    unitError,
    DAMAGE_REPORTS_ERROR.LOAD_UNIT
  );

  if (!unit) {
    return missingUnit;
  }

  const offset =
    (page - DAMAGE_REPORTS_PAGINATION.FIRST_PAGE) *
    DAMAGE_REPORTS_PAGINATION.PAGE_SIZE;
  const { data, error } = await supabase
    .from("damage_reports")
    .select(
      "id, cause, description, impact_delta, created_at"
    )
    .eq("unit_id", unitId)
    .order("created_at", { ascending: false })
    .range(
      offset,
      offset + DAMAGE_REPORTS_PAGINATION.PAGE_SIZE
    );
  throwIfSupabaseError(
    error,
    DAMAGE_REPORTS_ERROR.LOAD_REPORTS
  );

  const rows = data ?? [];

  return {
    entries: rows
      .slice(0, DAMAGE_REPORTS_PAGINATION.PAGE_SIZE)
      .map((row) => ({
        cause: row.cause,
        createdAt: row.created_at,
        description: row.description,
        id: row.id,
        impactDelta: row.impact_delta,
      })),
    hasNextPage:
      rows.length > DAMAGE_REPORTS_PAGINATION.PAGE_SIZE,
    page,
    unit: {
      categoryName: unit.category?.name ?? "",
      code: unit.code,
      id: unit.id,
      impactCount: unit.impact_count,
    },
  };
};

import { getOperationsSupabaseClient } from "@/app/services/operations/getOperationsSupabaseClient";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MAINTENANCE_HISTORY_ERROR,
  MAINTENANCE_HISTORY_PAGINATION,
} from "../constants/MaintenanceHistory.constants";
import type { MaintenanceHistoryPage } from "../models/MaintenanceHistoryPage.interface";

export const getMaintenanceHistory = async (
  page: number
): Promise<MaintenanceHistoryPage> => {
  const supabase = await getOperationsSupabaseClient();
  const offset =
    (page - MAINTENANCE_HISTORY_PAGINATION.FIRST_PAGE) *
    MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE;
  const { data, error } = await supabase
    .from("maintenance_records")
    .select(
      "id, work_type, description, is_external, cost_amount, cost_currency, performed_at, unit:equipment_units(code, category:equipment_categories(name))"
    )
    .order("performed_at", { ascending: false })
    .order("created_at", { ascending: false })
    .range(
      offset,
      offset + MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE
    );
  throwIfSupabaseError(
    error,
    MAINTENANCE_HISTORY_ERROR.LOAD_HISTORY
  );

  const rows = data ?? [];

  return {
    entries: rows
      .slice(0, MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE)
      .map((row) => ({
        categoryName: row.unit?.category?.name ?? "",
        costAmount:
          row.cost_amount === null
            ? null
            : Number(row.cost_amount),
        costCurrency: row.cost_currency,
        description: row.description,
        id: row.id,
        isExternal: row.is_external,
        performedAt: row.performed_at,
        unitCode: row.unit?.code ?? "",
        workType: row.work_type,
      })),
    hasNextPage:
      rows.length >
      MAINTENANCE_HISTORY_PAGINATION.PAGE_SIZE,
    page,
  };
};

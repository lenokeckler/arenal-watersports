import { createServerSupabaseClient } from "@/app/services/supabase";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { UnitListPage } from "../models/UnitListPage.interface";
import { mapUnitListRowToItem } from "../utils/mapUnitListRowToItem";
import { fetchUnitCount } from "./fetchUnitCount";
import { fetchUnits } from "./fetchUnits";
import { fetchUnitViewStatuses } from "./fetchUnitViewStatuses";

export const listUnits = async (
  categoryId: string,
  page: number
): Promise<UnitListPage> => {
  const supabase = await createServerSupabaseClient();

  const pageCount = resolveListPageCount(
    await fetchUnitCount(supabase, categoryId)
  );

  if (page > pageCount) {
    return { units: [], pageCount };
  }

  const unitRows = await fetchUnits(
    supabase,
    categoryId,
    resolveListPageRange(page)
  );
  const viewStatusById = await fetchUnitViewStatuses(
    supabase,
    unitRows.map((unitRow) => unitRow.id)
  );

  return {
    units: unitRows.map((unitRow) =>
      mapUnitListRowToItem(unitRow, viewStatusById)
    ),
    pageCount,
  };
};

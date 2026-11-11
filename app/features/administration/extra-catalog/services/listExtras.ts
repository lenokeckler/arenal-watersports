import { createServerSupabaseClient } from "@/app/services/supabase";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { ExtraListPage } from "../models/ExtraListPage.interface";
import { mapExtraRowToExtra } from "../utils/mapExtraRowToExtra";
import { fetchExtraCount } from "./fetchExtraCount";
import { fetchExtras } from "./fetchExtras";

export const listExtras = async (
  page: number
): Promise<ExtraListPage> => {
  const supabase = await createServerSupabaseClient();

  const totalCount = await fetchExtraCount(supabase);
  const pageCount = resolveListPageCount(totalCount);

  if (
    page < LIST_PAGINATION.FIRST_PAGE ||
    page > pageCount
  ) {
    return { extras: [], pageCount, totalCount };
  }

  const extraRows = await fetchExtras(
    supabase,
    resolveListPageRange(page)
  );

  return {
    extras: extraRows.map(mapExtraRowToExtra),
    pageCount,
    totalCount,
  };
};

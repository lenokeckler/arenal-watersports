import { DEPOSIT_QUERY, LENGTH } from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { buildDepositsPage } from "./buildDepositsPage";
import type { DepositsPage } from "./models/DepositsPage.interface";
import type { DepositsRangeReader } from "./models/DepositsRangeReader.type";

const readLastDepositsPage = async <Row>(
  readRange: DepositsRangeReader<Row>,
  operation: string
): Promise<DepositsPage<Row>> => {
  const firstPage = await readRange(
    resolveListPageRange(LIST_PAGINATION.FIRST_PAGE)
  );
  throwIfSupabaseError(firstPage.error, operation);

  const lastPage = Math.max(
    LIST_PAGINATION.FIRST_PAGE,
    resolveListPageCount(firstPage.count ?? LENGTH.ZERO)
  );
  const lastPageResponse = await readRange(
    resolveListPageRange(lastPage)
  );
  throwIfSupabaseError(lastPageResponse.error, operation);

  return buildDepositsPage(lastPageResponse, lastPage);
};

export const readDepositsPage = async <Row>(
  readRange: DepositsRangeReader<Row>,
  page: number,
  operation: string
): Promise<DepositsPage<Row>> => {
  const response = await readRange(
    resolveListPageRange(page)
  );

  if (
    response.error?.code ===
    DEPOSIT_QUERY.OUT_OF_RANGE_ERROR
  ) {
    return readLastDepositsPage(readRange, operation);
  }

  throwIfSupabaseError(response.error, operation);

  return buildDepositsPage(response, page);
};

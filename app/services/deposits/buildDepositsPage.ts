import { LENGTH } from "@/app/constants";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import type { DepositsPage } from "./models/DepositsPage.interface";
import type { DepositsRangeResponse } from "./models/DepositsRangeResponse.interface";

export const buildDepositsPage = <Row>(
  { count, data }: DepositsRangeResponse<Row>,
  page: number
): DepositsPage<Row> => {
  const totalCount = count ?? LENGTH.ZERO;

  return {
    items: data ?? [],
    page,
    pageCount: resolveListPageCount(totalCount),
    totalCount,
  };
};

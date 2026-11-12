import { PATHS } from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { DEPOSITS_REPORT_QUERY_PARAM } from "../constants/DepositsReportQueryParam.constants";
import type { DepositsReportPages } from "../models/DepositsReportPages.interface";

export const buildDepositsReportHref = ({
  pending,
  retained,
}: DepositsReportPages): string => {
  const query = new URLSearchParams();

  if (pending > LIST_PAGINATION.FIRST_PAGE) {
    query.set(
      DEPOSITS_REPORT_QUERY_PARAM.PENDING_PAGE,
      String(pending)
    );
  }

  if (retained > LIST_PAGINATION.FIRST_PAGE) {
    query.set(
      DEPOSITS_REPORT_QUERY_PARAM.RETAINED_PAGE,
      String(retained)
    );
  }

  const search = query.toString();

  return search
    ? `${PATHS.ADMINISTRATION.DEPOSITS}?${search}`
    : PATHS.ADMINISTRATION.DEPOSITS;
};

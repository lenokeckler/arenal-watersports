import type { EquipmentJob } from "@/app/services/equipment/models/EquipmentJob.interface";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { UnitJobPage } from "../models/UnitJobPage.interface";

export const paginateJobs = (
  jobs: EquipmentJob[],
  requestedPage: number
): UnitJobPage => {
  const pageCount = resolveListPageCount(jobs.length);
  const currentPage = Math.max(
    LIST_PAGINATION.FIRST_PAGE,
    Math.min(requestedPage, pageCount)
  );
  const { from, to } = resolveListPageRange(currentPage);

  return {
    currentPage,
    jobs: jobs.slice(from, to + 1),
    pageCount,
  };
};

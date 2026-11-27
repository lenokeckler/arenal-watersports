import { describe, expect, it } from "vitest";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { paginateJobs } from "../utils/paginateJobs";
import { PAGED_JOBS } from "./UnitHistory.constants";

const LAST_PAGE = 3;
const LAST_PAGE_SIZE = 3;
const FAR_PAGE = 99;

describe("paginateJobs", () => {
  it("takes ten jobs for the first page", () => {
    const page = paginateJobs(
      PAGED_JOBS,
      LIST_PAGINATION.FIRST_PAGE
    );

    expect(page.pageCount).toBe(LAST_PAGE);
    expect(page.jobs).toEqual(
      PAGED_JOBS.slice(0, LIST_PAGINATION.PAGE_SIZE)
    );
  });

  it("shows the last page when the request goes past it", () => {
    const page = paginateJobs(PAGED_JOBS, FAR_PAGE);

    expect(page.currentPage).toBe(LAST_PAGE);
    expect(page.jobs).toHaveLength(LAST_PAGE_SIZE);
  });

  it("stays on the first page when there are no jobs", () => {
    expect(paginateJobs([], FAR_PAGE)).toEqual({
      currentPage: LIST_PAGINATION.FIRST_PAGE,
      jobs: [],
      pageCount: 0,
    });
  });
});

import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  PATHS,
  SUPABASE_WORK_AREA,
  WORKER_LIST_QUERY_PARAMETER,
  WORKER_LIST_STATUS,
} from "@/app/constants";
import { resolveWorkerListPageHref } from "../utils/resolveWorkerListPageHref";
import { WORKER_LIST_TEST_SEARCH } from "./WorkerList.constants";

describe("resolveWorkerListPageHref", () => {
  it("omits the default page while preserving active filters", () => {
    const parameters = new URLSearchParams({
      [WORKER_LIST_QUERY_PARAMETER.ROLE]:
        SUPABASE_WORK_AREA.OPERATIONS,
      [WORKER_LIST_QUERY_PARAMETER.STATUS]:
        WORKER_LIST_STATUS.ACTIVE,
    });

    expect(
      resolveWorkerListPageHref(
        PAGINATION.DEFAULT_PAGE,
        WORKER_LIST_TEST_SEARCH
      )
    ).toBe(
      `${PATHS.ADMINISTRATION.WORKERS}?${parameters.toString()}`
    );
  });

  it("preserves filters and uses a zero-based page value", () => {
    const pageIndex = PAGINATION.ONE_PAGE;
    const parameters = new URLSearchParams({
      [WORKER_LIST_QUERY_PARAMETER.ROLE]:
        SUPABASE_WORK_AREA.OPERATIONS,
      [WORKER_LIST_QUERY_PARAMETER.STATUS]:
        WORKER_LIST_STATUS.ACTIVE,
      [PAGINATION.QUERY_PARAMS.PAGE]: `${pageIndex}`,
    });

    expect(
      resolveWorkerListPageHref(
        pageIndex,
        WORKER_LIST_TEST_SEARCH
      )
    ).toBe(
      `${PATHS.ADMINISTRATION.WORKERS}?${parameters.toString()}`
    );
  });
});

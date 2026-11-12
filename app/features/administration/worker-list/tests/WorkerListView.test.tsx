import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import {
  WORKER_LIST_COLUMNS,
  WORKER_LIST_COPY,
} from "../constants/WorkerListCopy.constants";
import WorkerListView from "../WorkerListView";
import { resolveWorkerListPageHref } from "../utils/resolveWorkerListPageHref";
import {
  WORKER_LIST_TEST_DISPLAY_ROW,
  WORKER_LIST_TEST_PAGE,
  WORKER_LIST_TEST_SEARCH,
} from "./WorkerList.constants";
import { createWorkerListViewPage } from "./WorkerListView.page";

describe("WorkerListView", () => {
  it("shows the required columns and external guide details", () => {
    render(
      <WorkerListView
        page={WORKER_LIST_TEST_PAGE}
        rows={[WORKER_LIST_TEST_DISPLAY_ROW]}
        search={WORKER_LIST_TEST_SEARCH}
      />
    );
    const workerListPage = createWorkerListViewPage();

    expect(workerListPage.getColumnHeaders()).toEqual(
      WORKER_LIST_COLUMNS
    );
    expect(
      workerListPage.getTextOccurrences(
        WORKER_LIST_TEST_DISPLAY_ROW.fullName
      )
    ).toHaveLength(
      PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE
    );
    expect(
      workerListPage.getTextOccurrences(
        WORKER_LIST_TEST_DISPLAY_ROW.status
      )
    ).toHaveLength(
      PAGINATION.ONE_PAGE + PAGINATION.ONE_PAGE
    );
    expect(
      workerListPage.getNextPageLink()
    ).toHaveAttribute(
      "href",
      resolveWorkerListPageHref(
        PAGINATION.ONE_PAGE,
        WORKER_LIST_TEST_SEARCH
      )
    );
  });

  it("shows an explicit empty state for a valid empty page", () => {
    render(
      <WorkerListView
        page={{
          ...WORKER_LIST_TEST_PAGE,
          items: [],
          pageCount: PAGINATION.ONE_PAGE,
          totalCount: PAGINATION.ZERO_RESULTS,
        }}
        rows={[]}
        search={WORKER_LIST_TEST_SEARCH}
      />
    );

    expect(
      createWorkerListViewPage().getEmptyState()
    ).toHaveTextContent(WORKER_LIST_COPY.EMPTY);
  });
});

import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  DAMAGE_PENDING_LABEL,
  PATHS,
} from "@/app/constants";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import UnitHistoryView from "../UnitHistoryView";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryData } from "../models/UnitHistoryData.interface";
import {
  HISTORY_DATA,
  HISTORY_UNIT_ID,
  PAGED_JOBS,
  PENDING_REPORT_ID,
} from "./UnitHistory.constants";

const getLink = (name: string) =>
  screen.getByRole(ARIA_ROLE.LINK, { name });

const renderView = (
  data: UnitHistoryData,
  page: number = LIST_PAGINATION.FIRST_PAGE
) =>
  render(
    <UnitHistoryView
      data={data}
      errorMessage={null}
      page={page}
    />
  );

describe("UnitHistoryView", () => {
  afterEach(cleanup);

  it("shows jobs and damage of the machine", () => {
    renderView(HISTORY_DATA);

    expect(
      screen.getByText("Turbina nueva")
    ).toBeInTheDocument();
    expect(
      screen.getByText(DAMAGE_PENDING_LABEL)
    ).toBeInTheDocument();
    expect(
      getLink(UNIT_HISTORY_COPY.COMPLETE)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
        PENDING_REPORT_ID
      )
    );
  });

  it("starts a job or a report for this machine", () => {
    renderView(HISTORY_DATA);

    expect(
      getLink(UNIT_HISTORY_COPY.REGISTER_JOB)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.MAINTENANCE_NEW_FOR_UNIT(
        HISTORY_UNIT_ID
      )
    );
    expect(
      getLink(UNIT_HISTORY_COPY.REPORT_DAMAGE)
    ).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(
        HISTORY_UNIT_ID
      )
    );
  });

  it("hides the photos when the category keeps none", () => {
    renderView({
      ...HISTORY_DATA,
      unit: { ...HISTORY_DATA.unit, hasPhotos: false },
    });

    expect(
      screen.queryByRole(ARIA_ROLE.LINK, {
        name: UNIT_HISTORY_COPY.VIEW_PHOTOS,
      })
    ).not.toBeInTheDocument();
  });

  it("shows ten jobs per page and links to the next one", () => {
    renderView({ ...HISTORY_DATA, jobs: PAGED_JOBS });

    expect(
      screen.getAllByText(/^Trabajo \d+$/)
    ).toHaveLength(LIST_PAGINATION.PAGE_SIZE);
    expect(
      getLink(LIST_PAGINATION_COPY.NEXT)
    ).toHaveAttribute(
      "href",
      resolveListPageHref(
        PATHS.OPERATIONS.UNIT_HISTORY(HISTORY_UNIT_ID),
        LIST_PAGINATION.FIRST_PAGE + 1
      )
    );
  });

  it("keeps the totals of every job on any page", () => {
    renderView(
      { ...HISTORY_DATA, jobs: PAGED_JOBS },
      LIST_PAGINATION.FIRST_PAGE + 1
    );

    expect(
      screen.getByText(`${PAGED_JOBS.length}`)
    ).toBeInTheDocument();
  });

  it("says when the machine was not found", () => {
    render(
      <UnitHistoryView
        data={null}
        errorMessage={UNIT_HISTORY_COPY.NOT_FOUND}
        page={LIST_PAGINATION.FIRST_PAGE}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(UNIT_HISTORY_COPY.NOT_FOUND);
  });
});

import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { UNIT_RESERVATION_STATUS_LABEL } from "../constants/UnitReservationStatusLabel.constants";
import type { UnitReservationHistoryViewProps } from "../models/UnitReservationHistoryViewProps.interface";
import UnitReservationHistoryView from "../UnitReservationHistoryView";
import { resolveListPageHref } from "@/app/utils/list-pagination/resolveListPageHref";
import {
  buildUnitReservationHistoryViewProps,
  FAKE_HISTORY_BASE_PATH,
  MIDDLE_HISTORY_PAGE,
  MIDDLE_HISTORY_PAGE_COUNT,
} from "./UnitReservationHistory.constants";
import { buildUnitReservationItem } from "./UnitReservationHistory.constants";
import { createUnitReservationHistoryPage } from "./UnitReservationHistory.page";

const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const renderView = (
  overrides: Partial<UnitReservationHistoryViewProps> = {}
): void => {
  render(
    <UnitReservationHistoryView
      {...buildUnitReservationHistoryViewProps(overrides)}
    />
  );
};

describe("UnitReservationHistoryView", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("lists each reservation with its code, customer and status in the order it receives", () => {
    const first = buildUnitReservationItem({
      id: "first",
      code: "R-0002",
      customerName: "Luis Rojas",
      status: RESERVATION_STATUS.DISPATCHED,
    });
    const second = buildUnitReservationItem({
      id: "second",
      code: "R-0001",
      customerName: "Ana Mora",
      status: RESERVATION_STATUS.CANCELLED,
    });
    renderView({ reservations: [first, second] });
    const historyPage = createUnitReservationHistoryPage();
    const rowTexts = historyPage.getRowTexts();

    expect(rowTexts).toHaveLength(2);
    expect(rowTexts[0]).toContain(first.code);
    expect(rowTexts[0]).toContain(first.customerName);
    expect(rowTexts[0]).toContain(
      UNIT_RESERVATION_STATUS_LABEL[first.status]
    );
    expect(rowTexts[1]).toContain(second.code);
    expect(rowTexts[1]).toContain(
      UNIT_RESERVATION_STATUS_LABEL[second.status]
    );
  });

  it("renders the reservations as plain text without links to the reservation", () => {
    renderView();

    expect(
      createUnitReservationHistoryPage().getRowLinks()
    ).toHaveLength(0);
  });

  it("shows the empty state when the unit has no reservations", () => {
    renderView({ reservations: [], pageCount: 0 });

    expect(
      createUnitReservationHistoryPage().getEmptyStateTitle()
    ).toBeInTheDocument();
  });

  it("shows the error and refreshes the page on retry", async () => {
    renderView({ fetchFailed: true, reservations: [] });
    const historyPage = createUnitReservationHistoryPage();

    expect(
      historyPage.getErrorMessage()
    ).toBeInTheDocument();
    await historyPage.clickRetry();

    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("links to the previous and next pages of the unit screen", () => {
    renderView({
      currentPage: MIDDLE_HISTORY_PAGE,
      pageCount: MIDDLE_HISTORY_PAGE_COUNT,
    });
    const historyPage = createUnitReservationHistoryPage();

    expect(historyPage.getPreviousLink()).toHaveAttribute(
      "href",
      resolveListPageHref(
        FAKE_HISTORY_BASE_PATH,
        MIDDLE_HISTORY_PAGE - 1
      )
    );
    expect(historyPage.getNextLink()).toHaveAttribute(
      "href",
      resolveListPageHref(
        FAKE_HISTORY_BASE_PATH,
        MIDDLE_HISTORY_PAGE + 1
      )
    );
  });
});

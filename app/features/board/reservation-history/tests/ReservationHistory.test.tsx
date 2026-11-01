import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import ReservationHistoryInner from "../components/ReservationHistoryInner";
import {
  CANCELLED_ITEM,
  CLOSED_ITEM,
  CLOSED_ITEM_HREF,
  CURRENCY_SIGN_PATTERN,
  EQUIPMENT_TEXT,
  GUIDES_TEXT,
  HISTORY_QUERY,
  NEXT_PAGE_HREF,
  PAGED_COUNT,
  PAGED_INDEX,
  PAGED_STATUS_TEXT,
  PREVIOUS_PAGE_HREF,
  buildPage,
} from "./ReservationHistory.constants";
import { FORMAT_EXPECTED } from "./ReservationHistoryDateFormat.constants";
import { createReservationHistoryPage } from "./ReservationHistory.page";

const renderScreen = (
  items = [CLOSED_ITEM, CANCELLED_ITEM],
  pageIndex = 0,
  pageCount = 1
) => {
  render(
    <ReservationHistoryInner
      page={buildPage(items, pageIndex, pageCount)}
      query={HISTORY_QUERY}
    />
  );
  return createReservationHistoryPage();
};

describe("ReservationHistory", () => {
  it("shows customer, Costa Rica date, joined equipment, joined guides and attendant on a closed record", () => {
    const page = renderScreen();
    const [closedRow] = page.getRows();

    expect(
      page.getInRow(closedRow, CLOSED_ITEM.customerName)
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        closedRow,
        FORMAT_EXPECTED.AFTERNOON_DATE
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(closedRow, CLOSED_ITEM.attendedByName)
    ).toBeInTheDocument();
    expect(
      page.getInRow(closedRow, EQUIPMENT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getInRow(closedRow, GUIDES_TEXT)
    ).toBeInTheDocument();
  });

  it("shows the missing equipment and guide text", () => {
    const page = renderScreen();
    const [, cancelledRow] = page.getRows();

    expect(
      page.getInRow(
        cancelledRow,
        RESERVATION_HISTORY_COPY.NO_EQUIPMENT
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        cancelledRow,
        RESERVATION_HISTORY_COPY.NO_GUIDE
      )
    ).toBeInTheDocument();
  });

  it("marks only the cancelled record with text", () => {
    const page = renderScreen();
    const [closedRow, cancelledRow] = page.getRows();

    expect(
      page.getInRow(
        cancelledRow,
        RESERVATION_HISTORY_COPY.CANCELLED
      )
    ).toBeInTheDocument();
    expect(
      page.queryInRow(
        closedRow,
        RESERVATION_HISTORY_COPY.CANCELLED
      )
    ).not.toBeInTheDocument();
  });

  it("links each row to its record carrying the filters and page", () => {
    const page = renderScreen();
    const [closedRow] = page.getRows();

    expect(page.getRowLink(closedRow)).toHaveAttribute(
      "href",
      CLOSED_ITEM_HREF
    );
  });

  it("shows no money inside its own main landmark", () => {
    const page = renderScreen();

    expect(page.getMain().textContent).not.toMatch(
      CURRENCY_SIGN_PATTERN
    );
  });

  it("shows the empty state and no list without records", () => {
    const page = renderScreen([]);

    expect(
      page.getText(RESERVATION_HISTORY_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(page.queryList()).not.toBeInTheDocument();
  });

  it("hides the pagination with a single page", () => {
    const page = renderScreen();

    expect(page.queryNavigation()).not.toBeInTheDocument();
  });

  it("links both ends carrying the filters on a middle page", () => {
    const page = renderScreen(
      [CLOSED_ITEM],
      PAGED_INDEX,
      PAGED_COUNT
    );

    expect(
      page.getText(PAGED_STATUS_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getNavigationLink(
        RESERVATION_HISTORY_COPY.PAGINATION_PREVIOUS
      )
    ).toHaveAttribute("href", PREVIOUS_PAGE_HREF);
    expect(
      page.getNavigationLink(
        RESERVATION_HISTORY_COPY.PAGINATION_NEXT
      )
    ).toHaveAttribute("href", NEXT_PAGE_HREF);
  });

  it("shows the previous end as a disabled non-link on the first page", () => {
    const page = renderScreen(
      [CLOSED_ITEM],
      0,
      PAGED_COUNT
    );

    expect(
      page.queryNavigationLink(
        RESERVATION_HISTORY_COPY.PAGINATION_PREVIOUS
      )
    ).not.toBeInTheDocument();
    expect(
      page.getText(
        RESERVATION_HISTORY_COPY.PAGINATION_PREVIOUS
      )
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("shows the next end as a disabled non-link on the last page", () => {
    const page = renderScreen(
      [CLOSED_ITEM],
      PAGED_COUNT - 1,
      PAGED_COUNT
    );

    expect(
      page.queryNavigationLink(
        RESERVATION_HISTORY_COPY.PAGINATION_NEXT
      )
    ).not.toBeInTheDocument();
    expect(
      page.getText(RESERVATION_HISTORY_COPY.PAGINATION_NEXT)
    ).toHaveAttribute("aria-disabled", "true");
  });
});

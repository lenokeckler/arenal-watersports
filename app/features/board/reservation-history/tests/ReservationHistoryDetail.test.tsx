import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { readReservationHistoryRecord } from "@/app/services/board/reservation-history/readReservationHistoryRecord";
import ReservationHistoryDetailInner from "../components/ReservationHistoryDetailInner";
import ReservationHistoryNotFound from "../components/ReservationHistoryNotFound";
import { RESERVATION_HISTORY_COPY as COPY } from "../constants/ReservationHistoryCopy.constants";
import ReservationHistoryDetail from "../ReservationHistoryDetail";
import { CURRENCY_SIGN_PATTERN } from "./ReservationHistory.constants";
import { FORMAT_EXPECTED as DATES } from "./ReservationHistoryDateFormat.constants";
import {
  DETAIL_BACK_HREF,
  DETAIL_CANCELLED_REASON,
  DETAIL_CANCELLED_RECORD as CANCELLED,
  DETAIL_CLOSED_RECORD as CLOSED,
  DETAIL_LONG_REASON,
  DETAIL_NOT_FOUND_SIGNAL,
  DETAIL_SEARCH_PARAMS,
  DETAIL_TRUNCATION_CLASS_PATTERN,
} from "./ReservationHistoryDetail.constants";
import { createReservationHistoryDetailPage } from "./ReservationHistoryDetail.page";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error(DETAIL_NOT_FOUND_SIGNAL);
  },
}));

vi.mock(
  "@/app/services/board/reservation-history/readReservationHistoryRecord",
  () => ({ readReservationHistoryRecord: vi.fn() })
);

const ENTRY_PROPS = {
  reservationId: CLOSED.id,
  searchParams: DETAIL_SEARCH_PARAMS,
};

const renderDetail = (record = CLOSED) => {
  render(
    <ReservationHistoryDetailInner
      record={record}
      backHref={PATHS.HISTORY.ROOT}
    />
  );
  return createReservationHistoryDetailPage();
};

describe("ReservationHistoryDetail", () => {
  it("shows the closed record without marker, reason or money", () => {
    const page = renderDetail();

    expect(page.getLines(COPY.EQUIPMENT_LABEL)).toEqual(
      CLOSED.equipmentNames
    );
    expect(page.getLines(COPY.GUIDE_LABEL)).toEqual(
      CLOSED.guideNames
    );
    expect(page.getFieldText(COPY.CUSTOMER_LABEL)).toBe(
      COPY.CUSTOMER_LABEL + CLOSED.customerName
    );
    expect(page.getFieldText(COPY.DATE_LABEL)).toBe(
      COPY.DATE_LABEL + DATES.AFTERNOON_DATE_TIME
    );
    expect(page.getFieldText(COPY.ATTENDED_BY_LABEL)).toBe(
      COPY.ATTENDED_BY_LABEL + CLOSED.createdBy.name
    );
    expect(
      screen.queryByText(COPY.CANCELLED)
    ).not.toBeInTheDocument();
    expect(
      page.getHeading(COPY.CANCELLATION_REASON_TITLE)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.MAIN).textContent
    ).not.toMatch(CURRENCY_SIGN_PATTERN);
  });

  it("shows who created and who last modified it, not swapped", () => {
    const page = renderDetail();

    expect(
      page.getHeading(COPY.SIGNATURE_TITLE)
    ).toBeInTheDocument();
    expect(page.getFieldText(COPY.CREATED_BY_LABEL)).toBe(
      COPY.CREATED_BY_LABEL +
        CLOSED.createdBy.name +
        DATES.AFTERNOON_DATE_TIME
    );
    expect(page.getFieldText(COPY.UPDATED_BY_LABEL)).toBe(
      COPY.UPDATED_BY_LABEL +
        CLOSED.updatedBy.name +
        DATES.AT_MIDNIGHT_DATE_TIME
    );
    expect(
      screen.getByText(COPY.SIGNATURE_TIME_ZONE_NOTE)
    ).toBeInTheDocument();
  });

  it("shows the marker, the reason and the fallbacks for a cancelled record", () => {
    const page = renderDetail(CANCELLED);

    expect(
      page.getHeading(COPY.CANCELLATION_REASON_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByText(DETAIL_CANCELLED_REASON)
    ).toBeInTheDocument();
    expect(
      screen.getByText(COPY.CANCELLED)
    ).toBeInTheDocument();
    expect(page.getLines(COPY.EQUIPMENT_LABEL)).toEqual([
      COPY.NO_EQUIPMENT,
    ]);
    expect(page.getLines(COPY.GUIDE_LABEL)).toEqual([
      COPY.NO_GUIDE,
    ]);
  });

  it("renders a long reason whole with no truncation class", () => {
    renderDetail({
      ...CANCELLED,
      cancellationReason: DETAIL_LONG_REASON,
    });

    expect(
      screen.getByText(DETAIL_LONG_REASON).className
    ).not.toMatch(DETAIL_TRUNCATION_CLASS_PATTERN);
  });

  it("links back to the list with the same filters and page", async () => {
    vi.mocked(
      readReservationHistoryRecord
    ).mockResolvedValue(CLOSED);
    render(await ReservationHistoryDetail(ENTRY_PROPS));

    expect(
      createReservationHistoryDetailPage().getBackHref()
    ).toBe(DETAIL_BACK_HREF);
  });

  it("calls notFound when the record does not exist", async () => {
    vi.mocked(
      readReservationHistoryRecord
    ).mockResolvedValue(null);

    await expect(
      ReservationHistoryDetail(ENTRY_PROPS)
    ).rejects.toThrow(DETAIL_NOT_FOUND_SIGNAL);
  });

  it("shows the not found message and a link to the list", () => {
    render(
      <ReservationHistoryNotFound
        backHref={PATHS.HISTORY.ROOT}
      />
    );

    expect(
      screen.getByText(COPY.NOT_FOUND_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByText(COPY.NOT_FOUND_BODY)
    ).toBeInTheDocument();
    expect(
      createReservationHistoryDetailPage().getBackHref()
    ).toBe(PATHS.HISTORY.ROOT);
  });
});

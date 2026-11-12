import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PATHS,
  RESERVATION_CALENDAR_ACTIVE_STATUS as status,
  RESERVATION_HISTORY_STATUS,
  RESERVATIONS_CALENDAR_COPY as copy,
} from "@/app/constants";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { ReservationCalendarGroupList } from "../components/ReservationCalendarGroupList";
import { createReservationCalendarBlockPage } from "./ReservationCalendarBlock.page";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

const renderAgendaBlock = (
  entryStatus: typeof CALENDAR_BLOCK_ENTRY.status
) => {
  const block = buildReservationCalendarBlock({
    ...CALENDAR_BLOCK_ENTRY,
    status: entryStatus,
  });
  render(
    <ReservationCalendarGroupList
      groups={[
        {
          blocks: [block],
          date: { day: 14, month: 10, year: 2026 },
          dateLabel: copy.TITLE,
        },
      ]}
    />
  );
  return createReservationCalendarBlockPage(block);
};

describe("Reservation block modify link", () => {
  it("links a scheduled block to its edit screen, named after the customer", () => {
    const link = renderAgendaBlock(
      status.SCHEDULED
    ).getModifyLink();

    expect(link).toHaveTextContent(copy.MODIFY_RESERVATION);
    expect(link).toHaveAccessibleName(
      `${copy.MODIFY_RESERVATION_LABEL} ${CALENDAR_BLOCK_ENTRY.customerName}`
    );
    expect(link?.getAttribute("href")).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.EDIT_SEGMENT}`
    );
  });

  it("keeps the modify link outside the detail link", () => {
    const page = renderAgendaBlock(status.SCHEDULED);

    expect(page.getDetailLink()).not.toContainElement(
      page.getModifyLink()
    );
  });

  it("offers no link on a dispatched block", () => {
    expect(
      renderAgendaBlock(status.DISPATCHED).getModifyLink()
    ).toBeNull();
  });
});

describe("Reservation block split link", () => {
  it("links a scheduled block to its split screen, named after the customer", () => {
    const link = renderAgendaBlock(
      status.SCHEDULED
    ).getSplitLink();

    expect(link).toHaveTextContent(copy.SPLIT_RESERVATION);
    expect(link).toHaveAccessibleName(
      `${copy.SPLIT_RESERVATION_LABEL} ${CALENDAR_BLOCK_ENTRY.customerName}`
    );
    expect(link?.getAttribute("href")).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.SPLIT_SEGMENT}`
    );
  });

  it("keeps the split link outside the detail link", () => {
    const page = renderAgendaBlock(status.SCHEDULED);

    expect(page.getDetailLink()).not.toContainElement(
      page.getSplitLink()
    );
  });

  it("offers no link on a dispatched block", () => {
    expect(
      renderAgendaBlock(status.DISPATCHED).getSplitLink()
    ).toBeNull();
  });
});

describe("Reservation block postpone link", () => {
  it.each([status.SCHEDULED, status.DISPATCHED])(
    "links a %s block to its postponement screen, named after the customer",
    (entryStatus) => {
      const link =
        renderAgendaBlock(entryStatus).getPostponeLink();

      expect(link).toHaveTextContent(
        copy.POSTPONE_RESERVATION
      );
      expect(link).toHaveAccessibleName(
        `${copy.POSTPONE_RESERVATION_LABEL} ${CALENDAR_BLOCK_ENTRY.customerName}`
      );
      expect(link?.getAttribute("href")).toBe(
        `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.POSTPONE_SEGMENT}`
      );
    }
  );

  it("keeps the postpone link outside the detail link", () => {
    const page = renderAgendaBlock(status.DISPATCHED);

    expect(page.getDetailLink()).not.toContainElement(
      page.getPostponeLink()
    );
  });

  it.each([
    RESERVATION_HISTORY_STATUS.CLOSED,
    RESERVATION_HISTORY_STATUS.CANCELLED,
  ])("offers no link on a %s block", (entryStatus) => {
    expect(
      renderAgendaBlock(entryStatus).getPostponeLink()
    ).toBeNull();
  });
});

describe("Reservation block cancel link", () => {
  it("links a scheduled block to its cancellation screen, named after the customer", () => {
    const link = renderAgendaBlock(
      status.SCHEDULED
    ).getCancelLink();

    expect(link).toHaveTextContent(copy.CANCEL_RESERVATION);
    expect(link).toHaveAccessibleName(
      `${copy.CANCEL_RESERVATION_LABEL} ${CALENDAR_BLOCK_ENTRY.customerName}`
    );
    expect(link?.getAttribute("href")).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.CANCEL_SEGMENT}`
    );
  });

  it("keeps the cancel link outside the detail link", () => {
    const page = renderAgendaBlock(status.SCHEDULED);

    expect(page.getDetailLink()).not.toContainElement(
      page.getCancelLink()
    );
  });

  it("links a dispatched block to its cancellation screen", () => {
    const link = renderAgendaBlock(
      status.DISPATCHED
    ).getCancelLink();

    expect(link).toHaveAccessibleName(
      `${copy.CANCEL_RESERVATION_LABEL} ${CALENDAR_BLOCK_ENTRY.customerName}`
    );
    expect(link?.getAttribute("href")).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.CANCEL_SEGMENT}`
    );
  });
});

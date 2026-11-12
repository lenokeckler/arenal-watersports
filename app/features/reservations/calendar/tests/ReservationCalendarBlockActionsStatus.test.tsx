import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ARIA_ROLE,
  PATHS,
  RESERVATION_STATUS,
  RESERVATIONS_CALENDAR_COPY as copy,
} from "@/app/constants";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { ReservationCalendarGroupList } from "../components/ReservationCalendarGroupList";
import { createReservationCalendarBlockPage } from "./ReservationCalendarBlock.page";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

const INACTIVE_STATUSES = [
  RESERVATION_STATUS.CLOSED,
  RESERVATION_STATUS.CANCELLED,
] as const;

const OTHER_BLOCK = {
  customerName: "Carlos Mora",
  id: "other-reservation-id",
} as const;

const renderBlocks = (
  entries: (typeof CALENDAR_BLOCK_ENTRY)[]
) => {
  const blocks = entries.map(buildReservationCalendarBlock);
  render(
    <ReservationCalendarGroupList
      groups={[
        {
          blocks,
          date: { day: 14, month: 10, year: 2026 },
          dateLabel: copy.TITLE,
        },
      ]}
    />
  );
  return blocks.map(createReservationCalendarBlockPage);
};

describe.each(INACTIVE_STATUSES)(
  "Reservation block actions on a %s block",
  (entryStatus) => {
    it("offers no modify, split or cancel link", () => {
      const [page] = renderBlocks([
        { ...CALENDAR_BLOCK_ENTRY, status: entryStatus },
      ]);

      expect(page.getModifyLink()).toBeNull();
      expect(page.getSplitLink()).toBeNull();
      expect(page.getCancelLink()).toBeNull();
    });
  }
);

describe("Reservation block actions on a dispatched block", () => {
  it("renders the postpone and cancel links alongside the detail link", () => {
    renderBlocks([
      {
        ...CALENDAR_BLOCK_ENTRY,
        status: RESERVATION_STATUS.DISPATCHED,
      },
    ]);

    expect(
      screen.getAllByRole(ARIA_ROLE.LINK)
    ).toHaveLength(3);
  });
});

describe("Reservation block actions across blocks", () => {
  it("points each cancel link at its own reservation with a distinct name", () => {
    const [scheduled, dispatched] = renderBlocks([
      {
        ...CALENDAR_BLOCK_ENTRY,
        status: RESERVATION_STATUS.SCHEDULED,
      },
      {
        ...CALENDAR_BLOCK_ENTRY,
        ...OTHER_BLOCK,
        status: RESERVATION_STATUS.DISPATCHED,
      },
    ]);

    expect(
      scheduled.getCancelLink()?.getAttribute("href")
    ).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${CALENDAR_BLOCK_ENTRY.id}/${PATHS.RESERVATIONS.CANCEL_SEGMENT}`
    );
    expect(
      dispatched.getCancelLink()?.getAttribute("href")
    ).toBe(
      `${PATHS.RESERVATIONS.ROOT}/${OTHER_BLOCK.id}/${PATHS.RESERVATIONS.CANCEL_SEGMENT}`
    );
    expect(dispatched.getModifyLink()).toBeNull();
    expect(scheduled.getModifyLink()).not.toBeNull();
  });
});

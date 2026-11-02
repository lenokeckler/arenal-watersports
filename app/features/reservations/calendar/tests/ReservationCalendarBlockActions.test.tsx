import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  PATHS,
  RESERVATION_CALENDAR_ACTIVE_STATUS as status,
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

  it("offers no link on a dispatched block", () => {
    expect(
      renderAgendaBlock(status.DISPATCHED).getModifyLink()
    ).toBeNull();
  });
});

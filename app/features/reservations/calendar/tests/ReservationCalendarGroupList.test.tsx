import { afterEach, describe, expect, it } from "vitest";
import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  ARIA_ROLE,
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { ReservationCalendarGroupList } from "../components/ReservationCalendarGroupList";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";
import {
  RESERVATION_CALENDAR_GROUP_LIST_DATE,
  RESERVATION_CALENDAR_GROUP_LIST_DATE_LABEL,
} from "./ReservationCalendarGroupList.constants";
import { createReservationCalendarGroupListPage } from "./ReservationCalendarGroupList.page";

afterEach(cleanup);

describe("reservation calendar group navigation", (): void => {
  it("links the complete reservation card to its detail with a localized name", (): void => {
    const block = buildReservationCalendarBlock(
      CALENDAR_BLOCK_ENTRY
    );
    const accessibleName = `${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${block.customerName}`;

    render(
      <ReservationCalendarGroupList
        groups={[
          {
            blocks: [block],
            date: RESERVATION_CALENDAR_GROUP_LIST_DATE,
            dateLabel:
              RESERVATION_CALENDAR_GROUP_LIST_DATE_LABEL,
          },
        ]}
      />
    );

    const reservationLink =
      createReservationCalendarGroupListPage(
        accessibleName
      ).getReservationLink();

    expect(reservationLink).toHaveAttribute(
      "href",
      PATHS.RESERVATIONS.DETAIL(block.id)
    );
    expect(reservationLink).toHaveAccessibleName(
      accessibleName
    );
    expect(reservationLink.tabIndex).toBe(0);
    expect(reservationLink.firstElementChild).toBe(
      screen.getByRole(ARIA_ROLE.GROUP)
    );
  });
});

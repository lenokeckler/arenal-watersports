import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import { useReservationCalendarDayContent } from "../hooks/useReservationCalendarDayContent";
import { CALENDAR_DAY_COVERAGE_CASES } from "./ReservationCalendarDayCases.constants";
import {
  CALENDAR_DAY_DATE,
  CALENDAR_DAY_EMPTY,
  CALENDAR_DAY_GUIDE_TEST,
  CALENDAR_DAY_SNAPSHOT,
} from "./ReservationCalendarDay.constants";
import { createReservationCalendarDayPage } from "./ReservationCalendarDay.page";
import { renderReservationCalendarDay } from "./renderReservationCalendarDay";

describe("Reservation calendar default daily content", () => {
  it.each(CALENDAR_DAY_COVERAGE_CASES)(
    "adds no message for $name by default",
    ({ snapshot, message }) => {
      renderReservationCalendarDay(snapshot);
      const page = createReservationCalendarDayPage();

      expect(page.getMessage(message)).toBeNull();
    }
  );

  it("preserves null for a missing snapshot", () => {
    const { result } = renderHook(() =>
      useReservationCalendarDayContent(undefined)
    );

    expect(result.current(CALENDAR_DAY_DATE)).toBeNull();
  });

  it("keeps existing blocks without opting into messages", () => {
    renderReservationCalendarDay(CALENDAR_DAY_SNAPSHOT);
    const page = createReservationCalendarDayPage();

    expect(page.getCustomer()).toBeVisible();
  });

  it("does not expose guide attribution in the default Reservations content", () => {
    const snapshot = {
      ...CALENDAR_DAY_SNAPSHOT,
      entries: [
        {
          ...CALENDAR_DAY_SNAPSHOT.entries[0],
          guides: [
            {
              fullName: CALENDAR_DAY_GUIDE_TEST.FULL_NAME,
              id: "calendar-day-guide",
              type: CALENDAR_DAY_GUIDE_TEST.TYPE,
            },
          ],
        },
      ],
    };
    renderReservationCalendarDay(snapshot);
    const page = createReservationCalendarDayPage();

    expect(
      page.getReservationBlock()
    ).not.toHaveAccessibleName(
      new RegExp(CALENDAR_DAY_GUIDE_TEST.FULL_NAME)
    );
    expect(
      page.getReservationBlock()
    ).not.toHaveAccessibleName(
      new RegExp(CALENDAR_DAY_GUIDE_TEST.TYPE_LABEL)
    );
  });
});

describe("Reservation calendar daily coverage updates", () => {
  it("updates messages when the flag changes with the same snapshot", () => {
    const { result, rerender } = renderHook(
      (showCoverageMessages: boolean) =>
        useReservationCalendarDayContent(
          CALENDAR_DAY_EMPTY,
          { showCoverageMessages }
        ),
      { initialProps: false }
    );
    const content = render(
      result.current(CALENDAR_DAY_DATE)
    );
    const page = createReservationCalendarDayPage();

    expect(result.current(CALENDAR_DAY_DATE)).toBeNull();
    rerender(true);
    content.rerender(result.current(CALENDAR_DAY_DATE));
    expect(
      page.getMessage(copy.EMPTY_PERIOD)
    ).toBeVisible();
    rerender(false);
    content.rerender(result.current(CALENDAR_DAY_DATE));
    expect(page.getMessage(copy.EMPTY_PERIOD)).toBeNull();
    expect(result.current(CALENDAR_DAY_DATE)).toBeNull();
  });
});

import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY } from "../constants/ReservationCalendarGuideCopy.constants";
import { useReservationCalendarDayContent } from "../hooks/useReservationCalendarDayContent";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
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

  it("keeps guide details hidden unless requested", () => {
    const snapshot = {
      ...CALENDAR_DAY_SNAPSHOT,
      entries: CALENDAR_DAY_SNAPSHOT.entries.map(
        (entry) => ({
          ...entry,
          guides: [
            {
              fullName: CALENDAR_DAY_GUIDE_TEST.FULL_NAME,
              id: CALENDAR_DAY_GUIDE_TEST.ID,
              type: CALENDAR_DAY_GUIDE_TEST.TYPE,
            },
          ],
        })
      ),
    };
    renderReservationCalendarDay(snapshot);
    const page = createReservationCalendarDayPage();

    expect(
      page.getMessage(RESERVATION_CALENDAR_GUIDE_COPY.LABEL)
    ).toBeNull();
    expect(
      page.getReservationBlock()
    ).not.toHaveAccessibleName(
      expect.stringContaining(
        CALENDAR_DAY_GUIDE_TEST.FULL_NAME
      )
    );
  });
});

describe("Reservation calendar daily coverage updates", () => {
  it("updates messages when the flag changes with the same snapshot", () => {
    const { result, rerender } = renderHook(
      (options: ReservationCalendarDayContentOptions) =>
        useReservationCalendarDayContent(
          CALENDAR_DAY_EMPTY,
          options
        ),
      { initialProps: { showCoverageMessages: false } }
    );
    const content = render(
      result.current(CALENDAR_DAY_DATE)
    );
    const page = createReservationCalendarDayPage();

    expect(result.current(CALENDAR_DAY_DATE)).toBeNull();
    rerender({ showCoverageMessages: true });
    content.rerender(result.current(CALENDAR_DAY_DATE));
    expect(
      page.getMessage(copy.EMPTY_PERIOD)
    ).toBeVisible();
    rerender({ showCoverageMessages: false });
    content.rerender(result.current(CALENDAR_DAY_DATE));
    expect(page.getMessage(copy.EMPTY_PERIOD)).toBeNull();
    expect(result.current(CALENDAR_DAY_DATE)).toBeNull();
  });
});

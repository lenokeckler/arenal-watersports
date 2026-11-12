import { render, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReservationCalendarDayContent } from "../hooks/useReservationCalendarDayContent";
import {
  CALENDAR_DAY_ACTION,
  CALENDAR_DAY_DATE,
  CALENDAR_DAY_SNAPSHOT,
} from "./ReservationCalendarDay.constants";
import { createReservationCalendarDayPage } from "./ReservationCalendarDay.page";
import { ReservationCalendarStoreProvider } from "./ReservationCalendarStoreProvider";

describe("Reservation calendar block actions", () => {
  it.each([
    { hasAction: true, showCoverageMessages: false },
    { hasAction: false, showCoverageMessages: true },
  ])(
    "with $showCoverageMessages coverage messages, action: $hasAction",
    ({ hasAction, showCoverageMessages }) => {
      const { result } = renderHook(
        () =>
          useReservationCalendarDayContent(
            CALENDAR_DAY_SNAPSHOT,
            {
              renderBlockActions: () => CALENDAR_DAY_ACTION,
              showCoverageMessages,
            }
          ),
        { wrapper: ReservationCalendarStoreProvider }
      );
      render(result.current(CALENDAR_DAY_DATE));

      expect(
        createReservationCalendarDayPage().getMessage(
          CALENDAR_DAY_ACTION
        ) !== null
      ).toBe(hasAction);
    }
  );
});

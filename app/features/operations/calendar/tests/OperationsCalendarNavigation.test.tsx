import { describe, expect, it } from "vitest";
import {
  CALENDAR_TEXT,
  CALENDAR_VIEW,
} from "@/app/constants";
import { store } from "@/app/store";
import { addCalendarDays } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { createOperationsCalendarPage } from "./OperationsCalendar.page";
import {
  OPERATIONS_CALENDAR_DEFAULTS,
  OPERATIONS_CALENDAR_TEST as fixture,
} from "./OperationsCalendar.constants";
import {
  renderOperationsCalendar,
  setupOperationsCalendarTests,
} from "./operationsCalendarTestSetup";

setupOperationsCalendarTests();

describe("Operations calendar date navigation", () => {
  it.each([
    { view: CALENDAR_VIEW.DAY, days: fixture.DAY_COUNT },
    { view: CALENDAR_VIEW.WEEK, days: fixture.WEEK_COUNT },
  ])(
    "moves $view by its civil period and returns to today",
    async ({ view, days }) => {
      renderOperationsCalendar();
      const page = createOperationsCalendarPage();
      await page.selectView(view);

      await page.navigate(CALENDAR_TEXT.NEXT);
      expect(store.getState().calendar.anchor).toEqual(
        addCalendarDays(
          OPERATIONS_CALENDAR_DEFAULTS.today,
          days
        )
      );
      await page.navigate(CALENDAR_TEXT.PREVIOUS);
      expect(store.getState().calendar.anchor).toEqual(
        OPERATIONS_CALENDAR_DEFAULTS.today
      );
      await page.navigate(CALENDAR_TEXT.NEXT);
      await page.navigate(CALENDAR_TEXT.TODAY);

      expect(store.getState().calendar.anchor).toEqual(
        OPERATIONS_CALENDAR_DEFAULTS.today
      );
      expect(page.getView(view)).toHaveAttribute(
        fixture.PRESSED,
        fixture.TRUE
      );
    }
  );
});

import { describe, expect, it } from "vitest";
import {
  CALENDAR_PREFERENCE,
  CALENDAR_VIEW,
} from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import { createOperationsCalendarPage } from "./OperationsCalendar.page";
import { OPERATIONS_CALENDAR_TEST as fixture } from "./OperationsCalendar.constants";
import {
  renderOperationsCalendar,
  setupOperationsCalendarTests,
} from "./operationsCalendarTestSetup";

setupOperationsCalendarTests();

describe("Operations calendar horizons", () => {
  it("offers exactly day and week with day initially selected", () => {
    renderOperationsCalendar();
    const page = createOperationsCalendarPage();

    expect(page.getHeading()).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.DAY)).toHaveAttribute(
      fixture.PRESSED,
      fixture.TRUE
    );
    expect(page.getView(CALENDAR_VIEW.WEEK)).toBeVisible();
    expect(page.getView(CALENDAR_VIEW.MONTH)).toBeNull();
    expect(page.getView(CALENDAR_VIEW.YEAR)).toBeNull();
  });
});

describe("Operations calendar incompatible preferences", () => {
  it.each([CALENDAR_VIEW.MONTH, CALENDAR_VIEW.YEAR])(
    "normalizes saved and current %s without overwriting storage",
    (view) => {
      window.localStorage.setItem(
        CALENDAR_PREFERENCE.STORAGE_KEY,
        view
      );
      store.dispatch(calendarActions.setSelectedView(view));
      renderOperationsCalendar();
      const page = createOperationsCalendarPage();

      expect(
        page.getView(CALENDAR_VIEW.DAY)
      ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
      expect(page.getView(view)).toBeNull();
      expect(page.queryAgenda()).toBeNull();
      expect(
        window.localStorage.getItem(
          CALENDAR_PREFERENCE.STORAGE_KEY
        )
      ).toBe(view);
    }
  );
});

describe("Operations calendar allowed preferences", () => {
  it.each([CALENDAR_VIEW.DAY, CALENDAR_VIEW.WEEK])(
    "restores saved %s",
    (view) => {
      window.localStorage.setItem(
        CALENDAR_PREFERENCE.STORAGE_KEY,
        view
      );
      renderOperationsCalendar();

      expect(
        createOperationsCalendarPage().getView(view)
      ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
    }
  );

  it("persists an allowed choice after unavailable preference fallback", async () => {
    window.localStorage.setItem(
      CALENDAR_PREFERENCE.STORAGE_KEY,
      CALENDAR_VIEW.YEAR
    );
    renderOperationsCalendar();
    const page = createOperationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.WEEK);

    expect(
      window.localStorage.getItem(
        CALENDAR_PREFERENCE.STORAGE_KEY
      )
    ).toBe(CALENDAR_VIEW.WEEK);
  });
});

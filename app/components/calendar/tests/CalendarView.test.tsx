import { describe, expect, it, vi } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREFERENCE,
  CALENDAR_TEXT,
  CALENDAR_VIEW,
} from "@/app/constants";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";
import { createCalendarViewPage } from "./CalendarView.page";
import { CALENDAR_TEST } from "./CalendarPresentation.constants";
import {
  renderCalendar,
  setupCalendarViewTests,
} from "./calendarViewTestSetup";

setupCalendarViewTests();
describe("CalendarView", () => {
  it.each(Object.values(CALENDAR_VIEW))(
    "selects and persists the %s view",
    async (view) => {
      renderCalendar();
      const calendar = createCalendarViewPage();

      await calendar.selectView(view);

      expect(calendar.getView(view)).toHaveAttribute(
        CALENDAR_TEST.PRESSED,
        CALENDAR_TEST.TRUE
      );
      expect(
        window.localStorage.getItem(
          CALENDAR_PREFERENCE.STORAGE_KEY
        )
      ).toBe(view);
    }
  );

  it("restores the saved year view when mounted again", async () => {
    const first = renderCalendar();
    await createCalendarViewPage().selectView(
      CALENDAR_VIEW.YEAR
    );
    first.unmount();

    renderCalendar();

    expect(
      createCalendarViewPage().getView(CALENDAR_VIEW.YEAR)
    ).toHaveAttribute(
      CALENDAR_TEST.PRESSED,
      CALENDAR_TEST.TRUE
    );
  });

  it("restricts operations without overwriting a saved month until selection", async () => {
    window.localStorage.setItem(
      CALENDAR_PREFERENCE.STORAGE_KEY,
      CALENDAR_VIEW.MONTH
    );
    renderCalendar(CALENDAR_ALLOWED_VIEWS.OPERATIONS);
    const calendar = createCalendarViewPage();

    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toBeNull();
    expect(calendar.getView(CALENDAR_VIEW.YEAR)).toBeNull();
    expect(
      calendar.getView(CALENDAR_VIEW.DAY)
    ).toHaveAttribute(
      CALENDAR_TEST.PRESSED,
      CALENDAR_TEST.TRUE
    );
    expect(
      window.localStorage.getItem(
        CALENDAR_PREFERENCE.STORAGE_KEY
      )
    ).toBe(CALENDAR_VIEW.MONTH);

    await calendar.selectView(CALENDAR_VIEW.WEEK);

    expect(
      window.localStorage.getItem(
        CALENDAR_PREFERENCE.STORAGE_KEY
      )
    ).toBe(CALENDAR_VIEW.WEEK);
  });

  it("navigates month and year and returns to today", async () => {
    renderCalendar();
    const calendar = createCalendarViewPage();
    await calendar.selectView(CALENDAR_VIEW.MONTH);
    const originalMonth = calendar.getTitle()?.textContent;

    await calendar.navigate(CALENDAR_TEXT.NEXT);
    expect(calendar.getTitle()?.textContent).not.toBe(
      originalMonth
    );
    await calendar.navigate(CALENDAR_TEXT.PREVIOUS);
    expect(calendar.getTitle()?.textContent).toBe(
      originalMonth
    );
    await calendar.selectView(CALENDAR_VIEW.YEAR);
    await calendar.navigate(CALENDAR_TEXT.NEXT);
    expect(calendar.getTitle()).toHaveTextContent(
      fixture.nextYearStart.year.toString()
    );
    await calendar.navigate(CALENDAR_TEXT.TODAY);
    expect(calendar.getTitle()).toHaveTextContent(
      fixture.leapEnd.year.toString()
    );
  });

  it("shows a Spanish storage error and keeps interactions usable", async () => {
    vi.spyOn(
      Storage.prototype,
      "getItem"
    ).mockImplementation(() => {
      throw new Error(CALENDAR_PREFERENCE.ERROR);
    });
    vi.spyOn(
      Storage.prototype,
      "setItem"
    ).mockImplementation(() => {
      throw new Error(CALENDAR_PREFERENCE.ERROR);
    });
    renderCalendar();
    const calendar = createCalendarViewPage();

    await calendar.selectView(CALENDAR_VIEW.MONTH);
    await calendar.navigate(CALENDAR_TEXT.NEXT);

    expect(calendar.getError()).toHaveTextContent(
      CALENDAR_PREFERENCE.ERROR
    );
    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toHaveAttribute(
      CALENDAR_TEST.PRESSED,
      CALENDAR_TEST.TRUE
    );
  });
});

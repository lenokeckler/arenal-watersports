import { describe, expect, it, vi } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREFERENCE,
  CALENDAR_PREFERENCE_COPY,
  CALENDAR_VIEW,
} from "@/app/constants";
import type { CalendarDayContent } from "../models/CalendarDayContent.type";
import type { CalendarPeriodContent } from "../models/CalendarPeriodContent.type";
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

  it("renders exactly the view choices supplied by its caller", () => {
    renderCalendar(CALENDAR_ALLOWED_VIEWS.OPERATIONS);
    const calendar = createCalendarViewPage();

    expect(
      calendar.getView(CALENDAR_VIEW.DAY)
    ).toBeVisible();
    expect(
      calendar.getView(CALENDAR_VIEW.WEEK)
    ).toBeVisible();
    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toBeNull();
    expect(calendar.getView(CALENDAR_VIEW.YEAR)).toBeNull();
  });

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

  it("falls back when the saved choice is unavailable without overwriting it", async () => {
    window.localStorage.setItem(
      CALENDAR_PREFERENCE.STORAGE_KEY,
      CALENDAR_VIEW.MONTH
    );
    renderCalendar(CALENDAR_ALLOWED_VIEWS.OPERATIONS);
    const calendar = createCalendarViewPage();

    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toBeNull();
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

  it("does not render without allowed view choices", () => {
    const { container } = renderCalendar([]);

    expect(container).toBeEmptyDOMElement();
  });

  it("passes the original civil date cell to its day content outlet", () => {
    const dayContent = vi.fn<CalendarDayContent>(
      () => null
    );
    const periodContent = vi.fn<CalendarPeriodContent>(
      () => null
    );
    renderCalendar(
      CALENDAR_ALLOWED_VIEWS.RESERVATIONS,
      dayContent,
      periodContent
    );

    const cellDate = dayContent.mock.calls[0][0];
    const periodDate =
      periodContent.mock.calls[0][0].days[0];

    expect(cellDate).toBe(periodDate);
  });

  it("shows a Spanish storage error and keeps interactions usable", async () => {
    vi.spyOn(
      Storage.prototype,
      "getItem"
    ).mockImplementation(() => {
      throw new Error(CALENDAR_PREFERENCE_COPY.ERROR);
    });
    vi.spyOn(
      Storage.prototype,
      "setItem"
    ).mockImplementation(() => {
      throw new Error(CALENDAR_PREFERENCE_COPY.ERROR);
    });
    const { rerenderCalendar } = renderCalendar();
    const calendar = createCalendarViewPage();

    await calendar.selectView(CALENDAR_VIEW.MONTH);
    rerenderCalendar({
      heading: CALENDAR_TEST.HEADING,
      today: fixture.marchStart,
      allowedViews: CALENDAR_ALLOWED_VIEWS.RESERVATIONS,
    });

    expect(calendar.getError()).toHaveTextContent(
      CALENDAR_PREFERENCE_COPY.ERROR
    );
    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toHaveAttribute(
      CALENDAR_TEST.PRESSED,
      CALENDAR_TEST.TRUE
    );
  });
});

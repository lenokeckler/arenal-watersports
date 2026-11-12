import { describe, expect, it, vi } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREFERENCE_COPY,
} from "@/app/constants";
import type { CalendarDayContent } from "../models/CalendarDayContent.type";
import type { CalendarPeriodContent } from "../models/CalendarPeriodContent.type";
import { CALENDAR_VIEW } from "@/app/constants";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";
import { createCalendarViewPage } from "./CalendarView.page";
import { CALENDAR_TEST } from "./CalendarPresentation.constants";
import {
  renderCalendar,
  setupCalendarViewTests,
} from "./calendarViewTestSetup";

setupCalendarViewTests();
describe("CalendarView content", () => {
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

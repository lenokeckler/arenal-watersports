import { describe, expect, it } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
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
describe("CalendarView navigation", () => {
  it("marks today in the visible period", () => {
    renderCalendar();
    expect(
      createCalendarViewPage().getToday()
    ).toHaveTextContent(CALENDAR_TEST.LEAP_LABEL);
  });

  it.each(Object.values(CALENDAR_VIEW))(
    "navigates the %s view and returns to today",
    async (view) => {
      renderCalendar();
      const calendar = createCalendarViewPage();
      await calendar.selectView(view);
      const originalTitle =
        calendar.getTitle()?.textContent;
      await calendar.navigate(CALENDAR_TEXT.NEXT);
      expect(calendar.getTitle()?.textContent).not.toBe(
        originalTitle
      );
      await calendar.navigate(CALENDAR_TEXT.PREVIOUS);
      expect(calendar.getTitle()?.textContent).toBe(
        originalTitle
      );
      await calendar.navigate(CALENDAR_TEXT.NEXT);
      await calendar.navigate(CALENDAR_TEXT.TODAY);
      expect(calendar.getTitle()?.textContent).toBe(
        originalTitle
      );
    }
  );

  it("keeps navigation after equivalent props are recreated", async () => {
    const { rerenderCalendar } = renderCalendar();
    const calendar = createCalendarViewPage();
    await calendar.selectView(CALENDAR_VIEW.MONTH);
    await calendar.navigate(CALENDAR_TEXT.NEXT);
    const nextTitle = calendar.getTitle()?.textContent;

    rerenderCalendar({
      heading: CALENDAR_TEST.HEADING,
      today: { ...fixture.leapEnd },
      allowedViews: [
        ...CALENDAR_ALLOWED_VIEWS.RESERVATIONS,
      ],
    });
    expect(calendar.getTitle()?.textContent).toBe(
      nextTitle
    );
    rerenderCalendar({
      heading: CALENDAR_TEST.HEADING,
      today: fixture.leapEnd,
      allowedViews: CALENDAR_ALLOWED_VIEWS.OPERATIONS,
    });
    expect(
      calendar.getView(CALENDAR_VIEW.MONTH)
    ).toBeNull();
    expect(calendar.getTitle()?.textContent).not.toBe(
      nextTitle
    );
  });
});

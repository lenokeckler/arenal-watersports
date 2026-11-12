import { describe, expect, it } from "vitest";
import {
  CALENDAR_ALLOWED_VIEWS,
  CALENDAR_PREFERENCE,
  CALENDAR_VIEW,
} from "@/app/constants";
import {
  CALENDAR_ACTIONS_CLASS,
  CALENDAR_DAY_CLASS,
  CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS,
  CALENDAR_SINGLE_DAY_CLASS,
  CALENDAR_WEEK_DAYS_CLASS,
} from "../styles/Calendar.styles";
import { CALENDAR_FIXTURE as fixture } from "./Calendar.constants";
import { createCalendarViewPage } from "./CalendarView.page";
import { createCalendarWeekLayoutPage } from "./CalendarWeekLayout.page";
import { CALENDAR_TEST } from "./CalendarPresentation.constants";
import {
  renderCalendar,
  setupCalendarViewTests,
} from "./calendarViewTestSetup";

setupCalendarViewTests();
describe("CalendarView choices", () => {
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

  it("uses horizontal day columns in week view", async () => {
    renderCalendar();
    const calendar = createCalendarViewPage();
    const page = createCalendarWeekLayoutPage();

    expect(
      page.getDayGridClassName(fixture.leapEnd)
    ).toContain(CALENDAR_SINGLE_DAY_CLASS);
    await calendar.selectView(CALENDAR_VIEW.WEEK);
    expect(
      page.getDayGridClassName(fixture.leapEnd)
    ).toContain(CALENDAR_WEEK_DAYS_CLASS);
    expect(
      page.getDayCardClassName(fixture.leapEnd)
    ).toContain(CALENDAR_DAY_CLASS);
  });

  it("hides the period date above centered navigation controls", () => {
    renderCalendar();
    const calendar = createCalendarViewPage();

    expect(calendar.getTitleClassName()).toContain(
      CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS
    );
    expect(
      calendar.getNavigationControlsClassName()
    ).toContain(CALENDAR_ACTIONS_CLASS);
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

  it("falls back when the saved choice is unavailable", async () => {
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
});

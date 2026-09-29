import { expect, test } from "@playwright/test";
import {
  CALENDAR_TEXT,
  CALENDAR_VIEW,
} from "@/app/constants";
import { createCalendarPage } from "../pages/Calendar.page";
import { E2E_CALENDAR } from "../constants/E2eCalendar.constants";

test("switches all views and remembers the selected view", async ({
  page,
}) => {
  const calendar = createCalendarPage(page);
  await calendar.goTo();
  for (const view of Object.values(CALENDAR_VIEW)) {
    await calendar.selectView(view);
    await expect(calendar.getView(view)).toHaveAttribute(
      E2E_CALENDAR.PRESSED_ATTRIBUTE,
      E2E_CALENDAR.PRESSED_VALUE
    );
    expect(await calendar.storedView()).toBe(view);
    expect(await calendar.fitsViewport()).toBe(true);
  }
  await page.reload();
  await expect(
    calendar.getView(CALENDAR_VIEW.YEAR)
  ).toHaveAttribute(
    E2E_CALENDAR.PRESSED_ATTRIBUTE,
    E2E_CALENDAR.PRESSED_VALUE
  );
});
test("navigates periods and returns to today", async ({
  page,
}) => {
  const calendar = createCalendarPage(page);
  await calendar.goTo();
  await calendar.selectView(CALENDAR_VIEW.MONTH);
  const initial = await calendar.getPeriod().innerText();
  await calendar.navigate(CALENDAR_TEXT.NEXT);
  await expect(calendar.getPeriod()).not.toHaveText(
    initial
  );
  await calendar.navigate(CALENDAR_TEXT.PREVIOUS);
  await expect(calendar.getPeriod()).toHaveText(initial);
  await calendar.navigate(CALENDAR_TEXT.TODAY);
  await expect(calendar.getToday().first()).toBeVisible();
});
test("limits operations without overwriting an unavailable preference", async ({
  page,
}) => {
  const calendar = createCalendarPage(page);
  await calendar.goTo();
  await calendar.selectView(CALENDAR_VIEW.MONTH);
  await calendar.goTo(true);
  await expect(
    calendar.getView(CALENDAR_VIEW.MONTH)
  ).toHaveCount(0);
  await expect(
    calendar.getView(CALENDAR_VIEW.YEAR)
  ).toHaveCount(0);
  await expect(
    calendar.getView(CALENDAR_VIEW.DAY)
  ).toHaveAttribute(
    E2E_CALENDAR.PRESSED_ATTRIBUTE,
    E2E_CALENDAR.PRESSED_VALUE
  );
  expect(await calendar.storedView()).toBe(
    CALENDAR_VIEW.MONTH
  );
  await calendar.selectView(CALENDAR_VIEW.WEEK);
  expect(await calendar.storedView()).toBe(
    CALENDAR_VIEW.WEEK
  );
  const bounds = await calendar
    .getView(CALENDAR_VIEW.WEEK)
    .boundingBox();
  expect(bounds?.height).toBeGreaterThanOrEqual(
    E2E_CALENDAR.MIN_BUTTON_HEIGHT
  );
});

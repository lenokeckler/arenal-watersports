import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_PREVIEW,
  CALENDAR_PREFERENCE,
  CALENDAR_TEXT,
  PATHS,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { CalendarView } from "@/app/components/calendar/models";
import { E2E_CALENDAR } from "../constants/E2eCalendar.constants";

const goToCalendar = async (
  page: Page,
  operations: boolean
): Promise<void> => {
  const query = operations
    ? `?${CALENDAR_PREVIEW.EXAMPLE_QUERY}=${CALENDAR_PREVIEW.OPERATIONS_EXAMPLE}`
    : STRING.Empty;
  await page.goto(
    `${PATHS.RESERVATIONS.CALENDAR_PREVIEW}${query}`
  );
};
const getCalendarView = (
  page: Page,
  view: CalendarView
): Locator =>
  page.getByRole(ARIA_ROLE.BUTTON, {
    name: CALENDAR_TEXT.LABELS[view],
    exact: true,
  });
const getCalendarPeriod = (page: Page): Locator =>
  page.getByRole(ARIA_ROLE.HEADING, {
    level: E2E_CALENDAR.PERIOD_LEVEL,
  });
const getStoredView = (
  page: Page
): Promise<NullableRef<string>> =>
  page.evaluate(
    (key) => localStorage.getItem(key),
    CALENDAR_PREFERENCE.STORAGE_KEY
  );
const fitsViewport = (page: Page): Promise<boolean> =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      window.innerWidth
  );

export const createCalendarPage = (page: Page) => ({
  fitsViewport: () => fitsViewport(page),
  getPeriod: () => getCalendarPeriod(page),
  getToday: () => page.locator(E2E_CALENDAR.TODAY_SELECTOR),
  getView: (view: CalendarView) =>
    getCalendarView(page, view),
  goTo: (operations = false) =>
    goToCalendar(page, operations),
  navigate: async (name: string): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, { name, exact: true })
      .click();
  },
  selectView: async (view: CalendarView): Promise<void> => {
    await getCalendarView(page, view).click();
  },
  storedView: () => getStoredView(page),
});

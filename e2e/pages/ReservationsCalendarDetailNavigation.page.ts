import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarDate } from "@/app/types";
import { formatCalendarDate } from "@/app/components/calendar/utils/formatCalendarPresentation";
import {
  E2E_RESERVATIONS_CALENDAR_ERRORS,
  E2E_RESERVATIONS_CALENDAR_KEYS,
  E2E_RESERVATIONS_CALENDAR_MAX_KEYBOARD_TABS,
  E2E_RESERVATIONS_CALENDAR_SELECTORS,
} from "../constants/E2eReservationsCalendar.constants";
import { getMainRegion } from "../support/mainRegion";

const focusReservationDetailLinkWithKeyboard =
  (page: Page) =>
  async (link: Locator): Promise<void> => {
    for (
      let tabCount = 0;
      tabCount <
      E2E_RESERVATIONS_CALENDAR_MAX_KEYBOARD_TABS;
      tabCount += 1
    ) {
      if (
        await link.evaluate(
          (element, selector) => element.matches(selector),
          E2E_RESERVATIONS_CALENDAR_SELECTORS.FOCUS_VISIBLE
        )
      ) {
        return;
      }
      await page.keyboard.press(
        E2E_RESERVATIONS_CALENDAR_KEYS.TAB
      );
    }
    throw new Error(
      E2E_RESERVATIONS_CALENDAR_ERRORS.KEYBOARD_FOCUS_FAILED
    );
  };

export const createReservationsCalendarDetailNavigationPage =
  (page: Page) => {
    const main = getMainRegion(page);
    return {
      getPeriodTitle: (date: CalendarDate): Locator =>
        main.getByRole(ARIA_ROLE.HEADING, {
          name: formatCalendarDate(date),
          exact: true,
        }),
      goToNextPeriod: async (): Promise<void> => {
        await main
          .getByRole(ARIA_ROLE.BUTTON, {
            name: CALENDAR_TEXT.NEXT,
            exact: true,
          })
          .click();
      },
      selectDayByDate: async (
        date: CalendarDate
      ): Promise<void> => {
        await main
          .getByRole(ARIA_ROLE.BUTTON, {
            name: new RegExp(
              `^${formatCalendarDate(date)}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_SEPARATOR}`
            ),
          })
          .click();
      },
      focusReservationDetailLinkWithKeyboard:
        focusReservationDetailLinkWithKeyboard(page),
      activateFocusedReservationDetailLink:
        async (): Promise<void> => {
          await page.keyboard.press(
            E2E_RESERVATIONS_CALENDAR_KEYS.ENTER
          );
        },
    };
  };

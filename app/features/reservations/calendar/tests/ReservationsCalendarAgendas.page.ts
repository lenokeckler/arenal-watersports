import { screen, within } from "@testing-library/react";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";

const getPeriodAgenda = (): HTMLElement =>
  screen.getByRole(ARIA_ROLE.REGION, {
    name: RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
  });

const getAgenda = (label: string): HTMLElement =>
  screen.getByRole(ARIA_ROLE.REGION, { name: label });

const getOptionalAgenda = (label: string) =>
  screen.queryByRole(ARIA_ROLE.REGION, { name: label });

const getAgendaReservationBlocks = (
  label: string
): HTMLElement[] =>
  within(getAgenda(label)).queryAllByRole(ARIA_ROLE.GROUP, {
    name: new RegExp(
      RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
    ),
  });

const isAgendaBeforePeriod = (label: string): boolean =>
  Boolean(
    getAgenda(label).compareDocumentPosition(
      getPeriodAgenda()
    ) & Node.DOCUMENT_POSITION_FOLLOWING
  );

const isPeriodAgendaAfterGrid = (): boolean =>
  Boolean(
    screen
      .getByRole(ARIA_ROLE.GROUP, {
        name: CALENDAR_TEXT.PERIOD_CONTENT,
      })
      .compareDocumentPosition(getPeriodAgenda()) &
    Node.DOCUMENT_POSITION_FOLLOWING
  );

export const createReservationsCalendarAgendasPage =
  () => ({
    getPeriodAgenda,
    getSelectedDayAgenda: () =>
      getOptionalAgenda(
        RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA
      ),
    getSelectedMonthAgenda: () =>
      getOptionalAgenda(
        RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA
      ),
    getSelectedDayReservationBlocks: () =>
      getAgendaReservationBlocks(
        RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA
      ),
    getSelectedMonthReservationBlocks: () =>
      getAgendaReservationBlocks(
        RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA
      ),
    getPeriodReservationBlocks: () =>
      getAgendaReservationBlocks(
        RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA
      ),
    getAgendaMessage: (label: string, message: string) =>
      within(getAgenda(label)).queryByText(message),
    isSelectedDayAgendaBeforePeriod: () =>
      isAgendaBeforePeriod(
        RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA
      ),
    isSelectedMonthAgendaBeforePeriod: () =>
      isAgendaBeforePeriod(
        RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA
      ),
    isPeriodAgendaAfterGrid,
  });

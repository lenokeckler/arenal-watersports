import {
  RESERVATIONS_CALENDAR_COPY,
  STRING,
} from "@/app/constants";
import { E2E_RESERVATIONS_CALENDAR_ERRORS } from "../constants/E2eReservationsCalendar.constants";
import type { ReservationsCalendarHeatDay } from "./models/ReservationsCalendarHeatDay.interface";
import type { ReservationsCalendarPage } from "./models/ReservationsCalendarPage.type";
import { expect } from "./activeWorkerTest";

const getFixtureCustomerName = (
  heatDay: ReservationsCalendarHeatDay
): string => {
  const [customerName] = heatDay.customerNames;
  if (customerName === undefined) {
    throw new Error(
      E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_RESERVATION_NAMES
    );
  }
  return customerName;
};

const assertSelectedAgendaPrecedesPeriod = async (
  selectedAgenda: ReturnType<
    ReservationsCalendarPage["getSelectedDayAgenda"]
  >
): Promise<void> => {
  const nextAgendaLabel = await selectedAgenda.evaluate(
    (element) =>
      element.nextElementSibling?.getAttribute(
        "aria-label"
      ) ?? STRING.Empty
  );
  expect(nextAgendaLabel).toBe(
    RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA
  );
};

export const assertSelectedDayAgenda = async (
  calendarPage: ReservationsCalendarPage,
  heatDay: ReservationsCalendarHeatDay
): Promise<void> => {
  const selectedAgenda =
    calendarPage.getSelectedDayAgenda();
  await expect(selectedAgenda).toBeVisible();
  await expect(
    calendarPage.getAgendaReservation(
      selectedAgenda,
      getFixtureCustomerName(heatDay)
    )
  ).toBeVisible();
  await assertSelectedAgendaPrecedesPeriod(selectedAgenda);
  await expect(
    calendarPage.getPeriodAgenda()
  ).toBeVisible();
};

export const assertSelectedMonthAgenda = async (
  calendarPage: ReservationsCalendarPage,
  heatDay: ReservationsCalendarHeatDay
): Promise<void> => {
  const selectedAgenda =
    calendarPage.getSelectedMonthAgenda();
  await expect(selectedAgenda).toBeVisible();
  await expect(
    calendarPage.getAgendaReservation(
      selectedAgenda,
      getFixtureCustomerName(heatDay)
    )
  ).toBeVisible();
  await assertSelectedAgendaPrecedesPeriod(selectedAgenda);
  await expect(
    calendarPage.getPeriodAgenda()
  ).toBeVisible();
};

import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { createReservationsCalendarAgendasPage } from "./ReservationsCalendarAgendas.page";
import { createReservationsCalendarBlocksPage } from "./ReservationsCalendarBlocks.page";
import { createReservationsCalendarDateSelectionPage } from "./ReservationsCalendarDateSelection.page";

export const createReservationsCalendarPage = () => {
  const agendas = createReservationsCalendarAgendasPage();
  const blocks = createReservationsCalendarBlocksPage();
  const dateSelection =
    createReservationsCalendarDateSelectionPage();
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: RESERVATIONS_CALENDAR_COPY.TITLE,
    });
  const getCreateReservationLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: RESERVATIONS_CALENDAR_COPY.CREATE_RESERVATION,
    });
  const getMessage = (message: string) =>
    screen.queryByText(message);
  return {
    ...agendas,
    ...blocks,
    ...dateSelection,
    getHeading,
    getCreateReservationLink,
    getMessage,
  };
};

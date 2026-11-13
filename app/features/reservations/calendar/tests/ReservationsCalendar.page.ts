import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { createReservationsCalendarAgendasPage } from "./ReservationsCalendarAgendas.page";
import { createReservationsCalendarBlocksPage } from "./ReservationsCalendarBlocks.page";
import { createReservationsCalendarDateSelectionPage } from "./ReservationsCalendarDateSelection.page";
import { RESERVATIONS_CALENDAR_TEST_COPY } from "./ReservationsCalendarTest.constants";

export const createReservationsCalendarPage = () => {
  const user = userEvent.setup();
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
  const queryExternalGuideRegistrationLink = () =>
    screen.queryByRole(ARIA_ROLE.LINK, {
      name: RESERVATIONS_CALENDAR_TEST_COPY.EXTERNAL_GUIDE_LINK_NAME,
    });
  const getMessage = (message: string) =>
    screen.queryByText(message);
  const getAgendaPagination = () =>
    screen.getByRole(ARIA_ROLE.NAVIGATION, {
      name: RESERVATIONS_CALENDAR_TEST_COPY.AGENDA_PAGINATION,
    });
  const getPageSizeSelector = () =>
    within(getAgendaPagination()).getByRole(
      ARIA_ROLE.COMBOBOX,
      {
        name: RESERVATIONS_CALENDAR_TEST_COPY.PAGE_SIZE_LABEL,
      }
    );
  const isAgendaPaginationImmediatelyAfterPeriodAgenda =
    () =>
      agendas.getPeriodAgenda().nextElementSibling ===
      getAgendaPagination();
  const queryGlobalReservationList = () =>
    screen.queryByRole(ARIA_ROLE.REGION, {
      name: RESERVATIONS_CALENDAR_TEST_COPY.GLOBAL_RESERVATION_LIST,
    });
  const goToNextAgendaPage = async (): Promise<void> => {
    await user.click(
      within(getAgendaPagination()).getByRole(
        ARIA_ROLE.BUTTON,
        {
          name: RESERVATIONS_CALENDAR_TEST_COPY.NEXT_PAGE,
        }
      )
    );
  };
  return {
    ...agendas,
    ...blocks,
    ...dateSelection,
    getHeading,
    getCreateReservationLink,
    queryExternalGuideRegistrationLink,
    getMessage,
    getAgendaPagination,
    getPageSizeSelector,
    isAgendaPaginationImmediatelyAfterPeriodAgenda,
    queryGlobalReservationList,
    goToNextAgendaPage,
  };
};

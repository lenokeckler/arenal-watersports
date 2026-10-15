import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";

export const createReservationsCalendarPage = () => {
  const user = userEvent.setup();
  const getView = (view: CalendarView) =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: CALENDAR_TEXT.LABELS[view],
    });
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: RESERVATIONS_CALENDAR_COPY.TITLE,
    });
  const getPeriodGrid = () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: CALENDAR_TEXT.PERIOD_CONTENT,
    });
  const getPeriodAgenda = () =>
    screen.getByRole(ARIA_ROLE.REGION, {
      name: RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
    });
  const isPeriodAgendaAfterGrid = () =>
    Boolean(
      getPeriodGrid().compareDocumentPosition(
        getPeriodAgenda()
      ) & Node.DOCUMENT_POSITION_FOLLOWING
    );
  const selectView = async (view: CalendarView) => {
    await user.click(getView(view));
  };
  const getReservationBlocks = () =>
    screen.queryAllByRole(ARIA_ROLE.GROUP, {
      name: new RegExp(
        RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
      ),
    });
  const getReservationBlockContainerClasses = () =>
    getReservationBlocks().map(
      (block) => block.parentElement?.className
    );
  const getMessage = (message: string) =>
    screen.queryByText(message);

  return {
    getHeading,
    getMessage,
    getPeriodAgenda,
    isPeriodAgendaAfterGrid,
    getReservationBlocks,
    getReservationBlockContainerClasses,
    getView,
    selectView,
  };
};

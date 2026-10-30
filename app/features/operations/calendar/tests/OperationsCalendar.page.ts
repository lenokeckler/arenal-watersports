import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  OPERATIONS_CALENDAR_COPY,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type {
  CalendarView,
  NullableRef,
} from "@/app/types";
import type { OperationsCalendarPage } from "./models/OperationsCalendarPage.interface";
import { OPERATIONS_CALENDAR_TEST } from "./OperationsCalendar.constants";

const getBlocks = (): HTMLElement[] =>
  screen.queryAllByRole(ARIA_ROLE.GROUP, {
    name: new RegExp(
      RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
    ),
  });
const getHeading = (): HTMLElement =>
  screen.getByRole(ARIA_ROLE.HEADING, {
    name: OPERATIONS_CALENDAR_COPY.TITLE,
  });
const getMessages = (message: string): HTMLElement[] =>
  screen.queryAllByText(message);
const getView = (
  view: CalendarView
): NullableRef<HTMLElement> =>
  screen.queryByRole(ARIA_ROLE.BUTTON, {
    name: CALENDAR_TEXT.LABELS[view],
  });
const queryAgenda = (): NullableRef<HTMLElement> =>
  screen.queryByRole(ARIA_ROLE.REGION, {
    name: RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
  });
const queryMoney = (): NullableRef<HTMLElement> =>
  screen.queryByText(
    OPERATIONS_CALENDAR_TEST.MONEY_PATTERN
  );

export const createOperationsCalendarPage =
  (): OperationsCalendarPage => {
    const user = userEvent.setup();
    const navigate = async (
      label: string
    ): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, { name: label })
      );
    };
    const selectView = (
      view: CalendarView
    ): Promise<void> =>
      navigate(CALENDAR_TEXT.LABELS[view]);
    return {
      getBlocks,
      getHeading,
      getMessages,
      getView,
      navigate,
      queryAgenda,
      queryMoney,
      selectView,
    };
  };

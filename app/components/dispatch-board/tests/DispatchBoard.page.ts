import { screen } from "@testing-library/react";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import {
  DISPATCH_BOARD_COPY,
  DISPATCH_BOARD_PAGINATION,
  DISPATCH_BOARD_QUERY,
} from "../constants/DispatchBoard.constants";

export const createDispatchBoardPage = () => {
  const getHeading = () =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: DISPATCH_BOARD_COPY.HEADING,
      level: 1,
    });

  const getReservation = (reservationCode: string) =>
    screen.getByRole(ARIA_ROLE.HEADING, {
      name: new RegExp(reservationCode),
      level: 2,
    });

  const getEmptyMessage = () =>
    screen.getByText(DISPATCH_BOARD_COPY.EMPTY);

  const getForbiddenMessage = () =>
    screen.getByRole(ARIA_ROLE.ALERT);

  const getNextPageLink = () =>
    screen.getByRole(ARIA_ROLE.LINK, {
      name: DISPATCH_BOARD_COPY.NEXT_PAGE,
    });

  const getNextPageHref = () =>
    `${PATHS.OPERATIONS.PENDING_DISPATCHES}${DISPATCH_BOARD_QUERY.SEPARATOR}${new URLSearchParams(
      {
        [DISPATCH_BOARD_PAGINATION.QUERY_KEY]: String(
          DISPATCH_BOARD_PAGINATION.FIRST_PAGE + 1
        ),
      }
    ).toString()}`;

  return {
    getEmptyMessage,
    getForbiddenMessage,
    getHeading,
    getNextPageLink,
    getNextPageHref,
    getReservation,
  };
};

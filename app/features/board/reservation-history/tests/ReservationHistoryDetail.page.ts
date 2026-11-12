import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { HREF_ATTRIBUTE } from "./ReservationHistoryStates.constants";

export const createReservationHistoryDetailPage = () => {
  const getField = (label: string) =>
    screen.getByText(label).closest("div") as HTMLElement;

  const getFieldText = (label: string) =>
    getField(label).textContent;

  const getLines = (label: string) =>
    Array.from(
      getField(label).querySelectorAll("dd > p"),
      (line) => line.textContent
    );

  const getHeading = (name: string) =>
    screen.queryByRole(ARIA_ROLE.HEADING, { name });

  const getBackHref = () =>
    screen
      .getByRole(ARIA_ROLE.LINK, {
        name: RESERVATION_HISTORY_COPY.BACK_TO_HISTORY,
      })
      .getAttribute(HREF_ATTRIBUTE);

  return {
    getBackHref,
    getFieldText,
    getHeading,
    getLines,
  };
};

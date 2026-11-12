import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { SPLIT_DEPARTURE_NUMBER } from "./ReservationSplit.constants";

export const createReservationSplitCardsPage = () => {
  const user = userEvent.setup();

  const queryText = (text: string) =>
    screen.queryByText(text);

  const increasePeople = () =>
    user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_SPLIT_UI_COPY.STEPPER_ADD_ARIA(
          RESERVATION_SPLIT_UI_COPY.PEOPLE,
          SPLIT_DEPARTURE_NUMBER
        ),
      })
    );

  const queryRemoveButton = (
    departureNumber = SPLIT_DEPARTURE_NUMBER
  ) =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_SPLIT_UI_COPY.REMOVE_DEPARTURE_ARIA(
        departureNumber
      ),
    });

  const changeTime = (index: number, time: string) =>
    fireEvent.change(
      screen.getAllByLabelText(
        new RegExp(
          RESERVATION_SPLIT_UI_COPY.LABEL_START_TIME
        )
      )[index],
      { target: { value: time } }
    );

  const getElementIds = () =>
    [...document.querySelectorAll("[id]")].map(
      (element) => element.id
    );

  return {
    changeTime,
    getElementIds,
    increasePeople,
    queryRemoveButton,
    queryText,
  };
};

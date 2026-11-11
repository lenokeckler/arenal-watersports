import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import {
  STEPPER_DEPARTURE_NUMBER,
  STEPPER_ERROR,
  STEPPER_LABEL,
} from "./ReservationSplitQuantityStepper.constants";

export const createReservationSplitQuantityStepperPage =
  () => {
    const user = userEvent.setup();

    const getDecreaseButton = () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_SPLIT_UI_COPY.STEPPER_REMOVE_ARIA(
          STEPPER_LABEL,
          STEPPER_DEPARTURE_NUMBER
        ),
      });

    const getIncreaseButton = () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_SPLIT_UI_COPY.STEPPER_ADD_ARIA(
          STEPPER_LABEL,
          STEPPER_DEPARTURE_NUMBER
        ),
      });

    const getGroup = () =>
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_SPLIT_UI_COPY.STEPPER_GROUP_ARIA(
          STEPPER_LABEL,
          STEPPER_DEPARTURE_NUMBER
        ),
      });

    const queryAtMaxNote = () =>
      screen.queryByText(
        RESERVATION_SPLIT_UI_COPY.STEPPER_AT_MAX
      );

    const getErrorText = () =>
      screen.getByText(STEPPER_ERROR);

    const getValueText = (value: number) =>
      screen.getByText(
        RESERVATION_SPLIT_UI_COPY.STEPPER_VALUE_SR(value)
      );

    const decrease = () => user.click(getDecreaseButton());
    const increase = () => user.click(getIncreaseButton());

    return {
      decrease,
      getDecreaseButton,
      getErrorText,
      getGroup,
      getIncreaseButton,
      getValueText,
      increase,
      queryAtMaxNote,
    };
  };

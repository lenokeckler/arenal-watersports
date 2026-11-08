import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";

const getSubmitButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_EDIT_COPY.SUBMIT,
  });

export const createReservationEditPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();

  return {
    findFormError: (message: string) =>
      screen.findByText(message),
    findSuccessMessage: () =>
      screen.findByText(RESERVATION_EDIT_COPY.SUCCESS),
    getHeading: () =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        name: RESERVATION_EDIT_COPY.TITLE,
      }),
    getSubmitButton,
    getSummaryValue: (value: string) =>
      screen.getByText(value),
    queryCustomerNameInput: () =>
      container.querySelector(
        `#${RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME}`
      ),
    queryDateInput: () =>
      container.querySelector(
        `#${RESERVATION_FORM_FIELD_ID.DATE}`
      ),
    submit: async (): Promise<void> => {
      await user.click(getSubmitButton());
    },
  };
};

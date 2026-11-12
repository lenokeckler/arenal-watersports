import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

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
    getBackLinks: () =>
      screen.getAllByRole(ARIA_ROLE.LINK, {
        name: RESERVATION_EDIT_COPY.BACK_TO_CALENDAR,
      }),
    getUnavailableHeading: () =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        name: RESERVATION_EDIT_COPY.UNAVAILABLE_TITLE,
      }),
    getUnavailableMessage: () =>
      screen.getByRole(ARIA_ROLE.STATUS),
    queryButton: () => screen.queryByRole(ARIA_ROLE.BUTTON),
    getLockedEquipment: () =>
      screen.getByRole(ARIA_ROLE.LIST, {
        name: RESERVATION_EDIT_COPY.LOCKED_EQUIPMENT_LABEL,
      }),
    getLockNotice: (notice: string) =>
      screen.getByText(notice),
    getHeading: () =>
      screen.getByRole(ARIA_ROLE.HEADING, {
        name: RESERVATION_EDIT_COPY.TITLE,
      }),
    getSubmitButton,
    getSummaryValue: (value: string) =>
      screen.getByText(value),
    queryEquipmentControls: () =>
      screen.queryByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY,
      }),
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

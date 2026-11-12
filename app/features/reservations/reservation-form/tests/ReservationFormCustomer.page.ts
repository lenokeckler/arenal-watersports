import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createReservationFormCustomerPage = () => {
  const user = userEvent.setup();

  return {
    fillCustomerName: async (
      value: string
    ): Promise<void> => {
      await user.type(
        screen.getByLabelText(
          RESERVATION_FORM_UI_COPY.CUSTOMER_NAME,
          { exact: false }
        ),
        value
      );
    },
  };
};

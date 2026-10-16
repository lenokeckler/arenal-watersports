import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_TEST_COPY } from "./ReservationFormView.constants";

export const createReservationFormViewPage = () => {
  const user = userEvent.setup();

  return {
    getDurationInput: () =>
      screen.getByLabelText(
        RESERVATION_FORM_UI_COPY.CUSTOM_DURATION,
        { exact: false }
      ),
    getSubmitButton: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.SUBMIT,
      }),
    getValidationError: () =>
      screen.findByText(
        RESERVATION_FORM_COPY[
          RESERVATION_FORM_FIELD.CUSTOMER_NAME
        ],
        { exact: true }
      ),
    getDurationPreset: () =>
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_TEST_COPY.PRESET_90_MINUTES,
      }),
    selectDurationPreset: async (): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_FORM_TEST_COPY.PRESET_90_MINUTES,
        })
      );
    },
    submit: async (): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_FORM_UI_COPY.SUBMIT,
        })
      );
    },
  };
};

import { fireEvent, screen } from "@testing-library/react";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_UNIT_SELECTOR_TEST } from "./CustomComboUnitSelector.constants";

export const createCustomComboUnitSelectorPage = () => ({
  getSelector: () =>
    screen.getByLabelText(
      `${RESERVATION_FORM_UI_COPY.UNIT}: ${CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME}`
    ),
  getAvailabilityError: () =>
    screen.getByText(
      RESERVATION_FORM_UI_COPY.AVAILABILITY_ERROR
    ),
  selectFirstAvailableUnit: (): void => {
    fireEvent.change(
      screen.getByLabelText(
        `${RESERVATION_FORM_UI_COPY.UNIT}: ${CUSTOM_COMBO_UNIT_SELECTOR_TEST.CATEGORY_NAME}`
      ),
      {
        target: {
          value:
            CUSTOM_COMBO_UNIT_SELECTOR_TEST
              .AVAILABLE_UNITS[0].id,
        },
      }
    );
  },
});

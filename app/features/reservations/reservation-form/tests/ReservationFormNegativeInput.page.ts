import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const getPeopleCountInput = () =>
  screen.getByLabelText(
    RESERVATION_FORM_UI_COPY.PEOPLE_COUNT,
    { exact: false }
  );

const getEquipmentQuantityInput = () =>
  screen.getByLabelText(RESERVATION_FORM_UI_COPY.QUANTITY, {
    exact: false,
  });

const getCustomDurationInput = () =>
  screen.getByLabelText(
    RESERVATION_FORM_UI_COPY.CUSTOM_DURATION,
    { exact: false }
  );

const enterValue = async (
  user: ReturnType<typeof userEvent.setup>,
  input: HTMLElement,
  value: string
): Promise<void> => {
  await user.clear(input);
  await user.type(input, value);
};

const attemptNegativeValue = (input: HTMLElement): void => {
  fireEvent.change(input, {
    target: {
      value: RESERVATION_FORM_VIEW_TEST.NEGATIVE_INPUT,
    },
  });
};

export const createReservationFormNegativeInputPage =
  () => {
    const user = userEvent.setup();

    return {
      getCustomDurationInput,
      getEquipmentQuantityInput,
      getPeopleCountInput,
      attemptNegativeCustomDuration: () =>
        attemptNegativeValue(getCustomDurationInput()),
      attemptNegativeEquipmentQuantity: () =>
        attemptNegativeValue(getEquipmentQuantityInput()),
      attemptNegativePeopleCount: () =>
        attemptNegativeValue(getPeopleCountInput()),
      enterEquipmentQuantity: (value: string) =>
        enterValue(
          user,
          getEquipmentQuantityInput(),
          value
        ),
      enterPeopleCount: (value: string) =>
        enterValue(user, getPeopleCountInput(), value),
      enterCustomDuration: (value: string) =>
        enterValue(user, getCustomDurationInput(), value),
      selectCustomDuration: async (): Promise<void> => {
        await user.click(
          screen.getByRole(ARIA_ROLE.BUTTON, {
            name: RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION,
          })
        );
      },
    };
  };

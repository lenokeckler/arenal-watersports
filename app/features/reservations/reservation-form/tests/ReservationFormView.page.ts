import { createReservationEquipmentPage } from "./ReservationFormEquipment.page";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const getDurationOption = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

const queryCustomDurationInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.DURATION}`
  );

const queryQuantityInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.QUANTITY}`
  );

const getSubmitButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_UI_COPY.SUBMIT,
  });

const querySubmitButton = (): NullableRef<HTMLElement> =>
  screen.queryByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_UI_COPY.SUBMIT,
  });

const getBackButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
    name: RESERVATION_FORM_VIEW_TEST.BACK_TO_CALENDAR,
  });

const findDurationValidationError = () =>
  screen.findByText(
    RESERVATION_FORM_COPY[
      RESERVATION_FORM_FIELD.DURATION_HOURS
    ]
  );

const findSubmissionError = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUBMIT_ERROR);

const findSuccessMessage = () =>
  screen.findByText(RESERVATION_FORM_UI_COPY.SUCCESS);

const selectDuration = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string
): Promise<void> => {
  await user.click(getDurationOption(label));
};

const typeCustomDuration = async (
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement,
  value: string
): Promise<void> => {
  const customDurationInput =
    queryCustomDurationInput(container);
  if (!customDurationInput) {
    throw new Error(
      "Custom duration input is not visible."
    );
  }
  await user.type(customDurationInput, value);
};

const submit = async (
  user: ReturnType<typeof userEvent.setup>
): Promise<void> => {
  await user.click(getSubmitButton());
};

const createQuantityPage = (
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement
) => ({
  setQuantity: async (quantity: string): Promise<void> => {
    const quantityInput = queryQuantityInput(container);
    if (!quantityInput) {
      throw new Error(
        "The equipment quantity field is missing."
      );
    }
    await user.clear(quantityInput);
    await user.type(quantityInput, quantity);
  },
});

export const createReservationFormViewPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();

  return {
    ...createReservationEquipmentPage(user),
    getDurationOption,
    getBackButton,
    findDurationValidationError,
    findSubmissionError,
    findSuccessMessage,
    getSubmitButton,
    querySubmitButton,
    clickBack: async (): Promise<void> => {
      await user.click(getBackButton());
    },
    queryCustomDurationInput: () =>
      queryCustomDurationInput(container),
    queryQuantityInput: () => queryQuantityInput(container),
    selectDuration: (label: string) =>
      selectDuration(user, label),
    ...createQuantityPage(user, container),
    submit: () => submit(user),
    typeCustomDuration: (value: string) =>
      typeCustomDuration(user, container, value),
  };
};

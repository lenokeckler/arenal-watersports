import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const getDurationOption = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

const queryCustomDurationInput = (container: HTMLElement) =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.DURATION}`
  );

const getSubmitButton = () =>
  screen.getByRole(ARIA_ROLE.BUTTON, {
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

export const createReservationFormViewPage = (
  container: HTMLElement
) => {
  const user = userEvent.setup();

  return {
    getDurationOption,
    getBackButton,
    findDurationValidationError,
    getSubmitButton,
    clickBack: async (): Promise<void> => {
      await user.click(getBackButton());
    },
    queryCustomDurationInput: () =>
      queryCustomDurationInput(container),
    selectDuration: (label: string) =>
      selectDuration(user, label),
    submit: () => submit(user),
    typeCustomDuration: (value: string) =>
      typeCustomDuration(user, container, value),
  };
};

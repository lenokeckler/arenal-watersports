import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const getSubmitButton = (): HTMLElement => {
  const submitButton = screen
    .getByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.ACTIONS,
    })
    .querySelector<HTMLElement>(
      RESERVATION_FORM_VIEW_TEST.SUBMIT_BUTTON_SELECTOR
    );
  if (!submitButton) {
    throw new Error(
      RESERVATION_FORM_VIEW_TEST.SUBMIT_BUTTON_MISSING
    );
  }
  return submitButton;
};

const querySubmitButton = (): NullableRef<HTMLElement> =>
  screen
    .queryByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.ACTIONS,
    })
    ?.querySelector(
      RESERVATION_FORM_VIEW_TEST.SUBMIT_BUTTON_SELECTOR
    ) ?? null;

const submit = async (
  user: ReturnType<typeof userEvent.setup>
): Promise<void> => {
  await waitFor(() => getSubmitButton());
  await user.click(getSubmitButton());
};

export const createReservationFormSubmitPage = (
  user: ReturnType<typeof userEvent.setup>
) => ({
  getSubmitButton,
  querySubmitButton,
  submit: (): Promise<void> => submit(user),
});

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

const getDurationOption = (label: string) =>
  screen.getByRole(ARIA_ROLE.BUTTON, { name: label });

const queryCustomDurationInput = (
  container: HTMLElement
): NullableRef<HTMLInputElement> =>
  container.querySelector<HTMLInputElement>(
    `#${RESERVATION_FORM_FIELD_ID.DURATION}`
  );

export const createReservationFormDurationPage = (
  user: ReturnType<typeof userEvent.setup>,
  container: HTMLElement
) => ({
  getDurationOption,
  findDurationValidationError: () =>
    screen.findByText(
      RESERVATION_FORM_COPY[
        RESERVATION_FORM_FIELD.DURATION_HOURS
      ]
    ),
  queryCustomDurationInput: () =>
    queryCustomDurationInput(container),
  selectDuration: async (label: string): Promise<void> => {
    await user.click(getDurationOption(label));
  },
  typeCustomDuration: async (
    value: string
  ): Promise<void> => {
    const input = queryCustomDurationInput(container);
    if (input === null) {
      throw new Error(
        "Custom duration input is not visible."
      );
    }
    await user.type(input, value);
  },
});

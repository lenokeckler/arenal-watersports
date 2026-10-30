import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createReservationTypeFieldPage = () => {
  const user = userEvent.setup();
  const getReservationTypeRadio = (label: string) =>
    screen.getByLabelText(label, { exact: false });
  const getCategorySelect = () =>
    screen.getByLabelText(
      `${RESERVATION_FORM_UI_COPY.CATEGORY} ${STRING.ASTERISK}`,
      { exact: true }
    );

  return {
    getReservationTypeRadio,
    getReservationTypeDescription: (description: string) =>
      screen.getByText(description, { exact: true }),
    findStatusMessage: (message: string) =>
      screen.findByText(message, { exact: true }),
    queryCategoryOption: (
      categoryId: string
    ): NullableRef<HTMLOptionElement> =>
      getCategorySelect().querySelector<HTMLOptionElement>(
        `option[value="${categoryId}"]`
      ),
    selectReservationType: async (
      label: string
    ): Promise<void> => {
      await user.click(getReservationTypeRadio(label));
    },
  };
};

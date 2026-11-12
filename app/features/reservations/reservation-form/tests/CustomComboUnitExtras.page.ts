import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createCustomComboUnitExtrasPage = (
  container: HTMLElement
) => {
  const form = within(container);
  const user = userEvent.setup();

  return {
    getExtraCheckbox: (name: string) =>
      form.getByRole(ARIA_ROLE.CHECKBOX, { name }),
    getInventoryNote: () =>
      form.getByText(
        RESERVATION_FORM_UI_COPY.EXTRA_INVENTORY_NOTE
      ),
    toggleExtra: async (name: string): Promise<void> => {
      await user.click(
        form.getByRole(ARIA_ROLE.CHECKBOX, { name })
      );
    },
  };
};

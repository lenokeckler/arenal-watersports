import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

export const createReservationFormExtrasPage = (
  user: ReturnType<typeof userEvent.setup>
) => ({
  getExtraCheckbox: (name: string) =>
    screen.getByRole(ARIA_ROLE.CHECKBOX, { name }),
  clickExtraCardContent: async (
    name: string
  ): Promise<void> => {
    const option = screen.getByRole(ARIA_ROLE.GROUP, {
      name,
    });
    const content = option.children.item(1);
    if (!(content instanceof HTMLElement)) {
      throw new Error("The extra card content is missing.");
    }
    await user.click(content);
  },
  getExtrasQuote: () =>
    screen.getByText(RESERVATION_FORM_UI_COPY.QUOTE_TITLE),
  getExtrasRetryButton: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_FORM_UI_COPY.EXTRAS_RETRY,
    }),
  getQuoteRetryButton: () =>
    screen.getByRole(ARIA_ROLE.BUTTON, {
      name: RESERVATION_FORM_UI_COPY.QUOTE_RETRY,
    }),
  toggleExtra: async (name: string): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.CHECKBOX, { name })
    );
  },
  clickExtrasRetry: async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.EXTRAS_RETRY,
      })
    );
  },
  clickQuoteRetry: async (): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.QUOTE_RETRY,
      })
    );
  },
});

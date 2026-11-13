import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const getCategoryName = (categoryId: string): string => {
  if (
    categoryId ===
    RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
  ) {
    return RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_NAME;
  }
  if (
    categoryId ===
    RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID
  ) {
    return RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME;
  }
  return RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME;
};

export const createReservationFormCategoryPage = (
  user: ReturnType<typeof userEvent.setup>
) => ({
  getSelectedCategoryOption: () =>
    screen
      .queryByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.CATEGORY,
      })
      ?.querySelector("button[aria-pressed='true']") ??
    null,
  getCategorySelect: () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY,
    }),
  queryCategoryOption: (categoryId: string) =>
    screen.queryByRole(ARIA_ROLE.BUTTON, {
      name: getCategoryName(categoryId),
    }),
  selectCategory: async (
    categoryId: string
  ): Promise<void> => {
    await user.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: getCategoryName(categoryId),
      })
    );
  },
});

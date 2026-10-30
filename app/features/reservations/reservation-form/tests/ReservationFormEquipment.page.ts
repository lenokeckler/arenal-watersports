import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, INPUT_TYPES } from "@/app/constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

const getCategorySelect = () =>
  screen.getByLabelText(RESERVATION_FORM_UI_COPY.CATEGORY, {
    selector: INPUT_TYPES.SELECT,
  });
export const createReservationEquipmentPage = (
  user: ReturnType<typeof userEvent.setup>
) => ({
  getEmptyCategories: () =>
    screen.getByText(
      RESERVATION_FORM_UI_COPY.NO_CATEGORIES
    ),
  getCategoryChoice: (categoryName: string) =>
    within(getCategorySelect()).getByText(categoryName),
  getEquipmentImage: (imageAlt: string) =>
    screen.getAllByAltText(imageAlt)[0],
  selectCategoryChoice: async (
    categoryName: string
  ): Promise<void> => {
    await user.selectOptions(
      getCategorySelect(),
      categoryName
    );
  },
  getCategoryGroup: () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: RESERVATION_FORM_UI_COPY.CATEGORY,
    }),
  findCategoryError: () =>
    screen.findByText(
      RESERVATION_FORM_COPY[
        RESERVATION_FORM_FIELD.CATEGORY_ID
      ]
    ),
});

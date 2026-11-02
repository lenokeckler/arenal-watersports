import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE, INPUT_TYPES } from "@/app/constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

const getCategoryGroup = () =>
  screen.getByRole(ARIA_ROLE.GROUP, {
    name: RESERVATION_FORM_UI_COPY.CATEGORY,
  });

const getCategoryChoice = (categoryName: string) =>
  within(getCategoryGroup()).getByRole(ARIA_ROLE.BUTTON, {
    name: categoryName,
  });

const getUnitSelect = () =>
  screen.getByLabelText(RESERVATION_FORM_UI_COPY.UNIT, {
    selector: INPUT_TYPES.SELECT,
    exact: false,
  });
export const createReservationEquipmentPage = (
  user: ReturnType<typeof userEvent.setup>
) => ({
  getEmptyCategories: () =>
    screen.getByText(
      RESERVATION_FORM_UI_COPY.NO_CATEGORIES
    ),
  getCategoryChoice,
  getEquipmentImage: (imageAlt: string) =>
    screen.getAllByAltText(imageAlt)[0],
  selectCategoryChoice: async (
    categoryName: string
  ): Promise<void> => {
    await user.click(getCategoryChoice(categoryName));
  },
  selectUnit: async (unitId: string): Promise<void> => {
    await user.selectOptions(getUnitSelect(), unitId);
  },
  findUnitSelect: () =>
    screen.findByLabelText(RESERVATION_FORM_UI_COPY.UNIT, {
      selector: INPUT_TYPES.SELECT,
      exact: false,
    }),
  findAvailableUnit: (unitCode: string) =>
    screen.findByText(unitCode),
  getUnitSelect,
  getCategoryGroup,
  findUnitUnavailableError: () =>
    screen.findByText(
      RESERVATION_FORM_UI_COPY.UNIT_UNAVAILABLE
    ),
  findCategoryError: () =>
    screen.findByText(
      RESERVATION_FORM_COPY[
        RESERVATION_FORM_FIELD.CATEGORY_ID
      ]
    ),
});

import { within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";

const createCategoryCardQuery =
  (form: ReturnType<typeof within>) =>
  (categoryName: string): HTMLElement => {
    const card = form
      .getByRole(ARIA_ROLE.HEADING, { name: categoryName })
      .closest("article");
    if (!card) {
      throw new Error(
        CUSTOM_COMBO_TEST.MISSING_CATEGORY_CARD_ERROR
      );
    }
    return card;
  };

const createCategoryActionQueries = (
  form: ReturnType<typeof within>,
  getCategoryCard: (categoryName: string) => HTMLElement
) => ({
  getAddCategoryButton: (categoryName: string) =>
    within(getCategoryCard(categoryName)).getByRole(
      ARIA_ROLE.BUTTON,
      {
        name: CUSTOM_COMBO_FORM_COPY.ADD,
      }
    ),
  getIncreaseCategoryButton: (categoryName: string) =>
    form.getByRole(ARIA_ROLE.BUTTON, {
      name: `${CUSTOM_COMBO_FORM_COPY.INCREASE} ${categoryName}`,
    }),
  getDecreaseCategoryButton: (categoryName: string) =>
    form.getByRole(ARIA_ROLE.BUTTON, {
      name: `${CUSTOM_COMBO_FORM_COPY.DECREASE} ${categoryName}`,
    }),
});

const createCategorySelectionQueries = (
  form: ReturnType<typeof within>,
  getCategoryCard: (categoryName: string) => HTMLElement
) => ({
  getCategorySelection: (categoryName: string) =>
    form.getByRole(ARIA_ROLE.GROUP, {
      name: `${CUSTOM_COMBO_FORM_COPY.QUANTITY}: ${categoryName}`,
    }),
  queryCategorySelection: (
    categoryName: string
  ): NullableRef<HTMLElement> =>
    form.queryByRole(ARIA_ROLE.GROUP, {
      name: `${CUSTOM_COMBO_FORM_COPY.QUANTITY}: ${categoryName}`,
    }),
  getCategoryQuantity: (
    categoryName: string,
    quantity: string
  ) =>
    within(getCategoryCard(categoryName)).getByText(
      quantity
    ),
  getGuideOnlyCategoryHeading: (categoryName: string) =>
    form.getByRole(ARIA_ROLE.HEADING, {
      name: categoryName,
    }),
  queryEquipmentQuantityNote: () =>
    form.queryByText(
      RESERVATION_FORM_UI_COPY.EQUIPMENT_QUANTITY_NOTE
    ),
});

export const createCustomComboSelectionQueries = (
  form: ReturnType<typeof within>
) => {
  const getCategoryCard = createCategoryCardQuery(form);
  return {
    ...createCategoryActionQueries(form, getCategoryCard),
    ...createCategorySelectionQueries(
      form,
      getCategoryCard
    ),
  };
};

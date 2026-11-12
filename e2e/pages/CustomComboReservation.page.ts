import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CUSTOM_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/CustomComboFormCopy.constants";
import { E2E_CUSTOM_COMBO } from "../constants/E2eCustomCombo.constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { createReservationFormPage } from "./ReservationForm.page";
import { getMainRegion } from "../support/mainRegion";

export const createCustomComboReservationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const reservationForm = createReservationFormPage(page);
  const getCategoryCard = (categoryName: string): Locator =>
    main
      .getByRole(ARIA_ROLE.HEADING, { name: categoryName })
      .locator("xpath=ancestor::article");
  const getPricingRegion = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: CUSTOM_COMBO_FORM_COPY.PRICING_TITLE,
    });
  const getGuideCheckbox = (guideName: string): Locator =>
    main.getByLabel(guideName, { exact: true });
  const getAgreedAmountInput = (label: string): Locator =>
    main.getByLabel(label, { exact: false });
  const getIncreaseCategoryButton = (
    categoryName: string
  ): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: `${CUSTOM_COMBO_FORM_COPY.INCREASE} ${categoryName}`,
    });
  const getDecreaseCategoryButton = (
    categoryName: string
  ): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: `${CUSTOM_COMBO_FORM_COPY.DECREASE} ${categoryName}`,
    });

  return {
    ...reservationForm,
    getAgreedAmountInput,
    getCategoryCard,
    getCategoryQuantityGroup: (
      categoryName: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: `${CUSTOM_COMBO_FORM_COPY.QUANTITY}: ${categoryName}`,
      }),
    getDecreaseCategoryButton: (
      categoryName: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: `${CUSTOM_COMBO_FORM_COPY.DECREASE} ${categoryName}`,
      }),
    getEquipmentSelectionRegion: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: CUSTOM_COMBO_FORM_COPY.TITLE,
      }),
    getGuideAssignmentField: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.GUIDES,
      }),
    getGuideCheckbox,
    getIncreaseCategoryButton: (
      categoryName: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: `${CUSTOM_COMBO_FORM_COPY.INCREASE} ${categoryName}`,
      }),
    getNoGuideStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS, {
        name: CUSTOM_COMBO_FORM_COPY.NO_GUIDE,
      }),
    hasHorizontalOverflow: async (): Promise<boolean> =>
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          window.innerWidth
      ),
    getPricingRegion,
    selectCombo: async (): Promise<void> =>
      await reservationForm.selectReservationType(
        RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
      ),
    addCategory: async (
      categoryName: string
    ): Promise<void> =>
      await getCategoryCard(categoryName)
        .getByRole(ARIA_ROLE.BUTTON, {
          name: CUSTOM_COMBO_FORM_COPY.ADD,
        })
        .click(),
    increaseCategory: async (
      categoryName: string
    ): Promise<void> =>
      await getIncreaseCategoryButton(categoryName).click(),
    decreaseCategory: async (
      categoryName: string
    ): Promise<void> =>
      await getDecreaseCategoryButton(categoryName).click(),
    selectGuide: async (guideName: string): Promise<void> =>
      await getGuideCheckbox(guideName).check(),
    fillAgreedAmount: async (
      label: string,
      amount: string
    ): Promise<void> =>
      await main
        .getByLabel(label, { exact: false })
        .fill(amount),
    scrollToEquipmentSelection: async (): Promise<void> =>
      await main
        .getByRole(ARIA_ROLE.REGION, {
          name: CUSTOM_COMBO_FORM_COPY.TITLE,
        })
        .scrollIntoViewIfNeeded(),
    scrollToNoGuideStatus: async (): Promise<void> =>
      await main
        .getByRole(ARIA_ROLE.STATUS, {
          name: CUSTOM_COMBO_FORM_COPY.NO_GUIDE,
        })
        .scrollIntoViewIfNeeded(),
    scrollToPricing: async (): Promise<void> =>
      await getAgreedAmountInput(
        E2E_CUSTOM_COMBO.COPY.USD_AMOUNT
      ).evaluate((input) =>
        input.scrollIntoView({ block: "center" })
      ),
  };
};

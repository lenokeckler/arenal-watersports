import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CUSTOM_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/CustomComboFormCopy.constants";
import { PREDEFINED_COMBO_FORM_COPY } from "@/app/features/reservations/reservation-form/constants/PredefinedComboFormCopy.constants";
import { PREDEFINED_COMBO_FORM_FIELD_ID } from "@/app/features/reservations/reservation-form/constants/PredefinedComboForm.constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { createReservationFormPage } from "./ReservationForm.page";
import { getMainRegion } from "../support/mainRegion";

const createComboSelectors = (main: Locator) => {
  const getComboSelect = (): Locator =>
    main.locator(
      `#${PREDEFINED_COMBO_FORM_FIELD_ID.SELECT}`
    );
  const getSummary = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: PREDEFINED_COMBO_FORM_COPY.SUMMARY_TITLE,
    });

  return {
    getComboSelect,
    getSummary,
    getNoGuideStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS, {
        name: CUSTOM_COMBO_FORM_COPY.NO_GUIDE,
      }),
    getGuideAssignmentField: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: RESERVATION_FORM_UI_COPY.GUIDES,
      }),
    getModeOption: (label: string): Locator =>
      main.getByLabel(label, { exact: true }),
  };
};

const createComboActions = (
  main: Locator,
  reservationForm: ReturnType<
    typeof createReservationFormPage
  >,
  selectors: ReturnType<typeof createComboSelectors>
) => ({
  selectComboMode: async (): Promise<void> =>
    await reservationForm.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    ),
  selectPredefinedMode: async (): Promise<void> =>
    await selectors
      .getModeOption(
        PREDEFINED_COMBO_FORM_COPY.PREDEFINED_MODE
      )
      .check(),
  selectPredefinedCombo: async (
    comboId: string
  ): Promise<void> => {
    await selectors.getComboSelect().selectOption(comboId);
  },
});

const createReservationActions = (main: Locator) => ({
  fillReservationCustomer: async (
    customerName: string
  ): Promise<void> =>
    await main
      .getByLabel(RESERVATION_FORM_UI_COPY.CUSTOMER_NAME, {
        exact: false,
      })
      .fill(customerName),
  submitReservation: async (): Promise<void> =>
    await main
      .getByRole(ARIA_ROLE.BUTTON, {
        name: RESERVATION_FORM_UI_COPY.SUBMIT,
        exact: true,
      })
      .click(),
});

const createViewportActions = (
  main: Locator,
  page: Page,
  selectors: ReturnType<typeof createComboSelectors>
) => ({
  scrollToSelection: async (): Promise<void> =>
    await main
      .getByRole(ARIA_ROLE.REGION, {
        name: PREDEFINED_COMBO_FORM_COPY.TITLE,
      })
      .scrollIntoViewIfNeeded(),
  scrollToSummary: async (): Promise<void> =>
    await selectors
      .getSummary()
      .evaluate((summary) =>
        summary.scrollIntoView({ block: "start" })
      ),
  hasHorizontalOverflow: async (): Promise<boolean> =>
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        window.innerWidth
    ),
});

export const createPredefinedComboReservationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const reservationForm = createReservationFormPage(page);
  const selectors = createComboSelectors(main);
  return {
    ...reservationForm,
    ...selectors,
    ...createComboActions(main, reservationForm, selectors),
    ...createReservationActions(main),
    ...createViewportActions(main, page, selectors),
  };
};

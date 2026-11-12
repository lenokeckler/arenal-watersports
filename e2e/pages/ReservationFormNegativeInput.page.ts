import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationFormNegativeInputPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  const getPeopleCountInput = (): Locator =>
    main.getByLabel(
      E2E_RESERVATION_FORM_COPY.PEOPLE_COUNT,
      { exact: false }
    );
  const getEquipmentQuantityInput = (): Locator =>
    main.getByLabel(E2E_RESERVATION_FORM_COPY.QUANTITY, {
      exact: false,
    });
  const getCustomDurationInput = (): Locator =>
    main.getByLabel(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION,
      { exact: false }
    );
  const fillInput = (
    input: Locator,
    value: string
  ): Promise<void> => input.fill(value);

  return {
    getCustomDurationInput,
    getEquipmentQuantityInput,
    getPeopleCountInput,
    attemptNegativeCustomDuration: (): Promise<void> =>
      fillInput(
        getCustomDurationInput(),
        E2E_RESERVATION_FORM_COPY.NEGATIVE_INPUT
      ),
    attemptNegativeEquipmentQuantity: (): Promise<void> =>
      fillInput(
        getEquipmentQuantityInput(),
        E2E_RESERVATION_FORM_COPY.NEGATIVE_INPUT
      ),
    attemptNegativePeopleCount: (): Promise<void> =>
      fillInput(
        getPeopleCountInput(),
        E2E_RESERVATION_FORM_COPY.NEGATIVE_INPUT
      ),
    enterEquipmentQuantity: (): Promise<void> =>
      fillInput(
        getEquipmentQuantityInput(),
        E2E_RESERVATION_FORM_COPY.VALID_EQUIPMENT_QUANTITY
      ),
    enterPeopleCount: (): Promise<void> =>
      fillInput(
        getPeopleCountInput(),
        E2E_RESERVATION_FORM_COPY.VALID_PEOPLE_COUNT
      ),
    enterCustomDuration: (): Promise<void> =>
      fillInput(
        getCustomDurationInput(),
        E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_HOURS
      ),
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.NEW);
    },
    selectCustomDuration: async (): Promise<void> => {
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_OPTION,
          exact: true,
        })
        .click();
    },
  };
};

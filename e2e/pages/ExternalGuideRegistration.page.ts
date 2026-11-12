import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { TEMPORARY_PASSWORD_BOX_COPY } from "@/app/components/temporary-password-box/constants/TemporaryPasswordBox.constants";
import { E2E_EXTERNAL_GUIDE_COPY } from "../constants/E2eExternalGuideRegistration.constants";
import { E2E_TEMPORARY_PASSWORD_SIBLING } from "../constants/E2eWorkerRegistration.constants";
import { getMainRegion } from "../support/mainRegion";
import type { ExternalGuideRegistrationDetails } from "../models/ExternalGuideRegistrationDetails.interface";

export const createExternalGuideRegistrationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const locators = {
    getCalendarLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: E2E_EXTERNAL_GUIDE_COPY.CREATE_LINK,
      }),
    getFullNameInput: (): Locator =>
      main.getByLabel(E2E_EXTERNAL_GUIDE_COPY.FULL_NAME),
    getNationalIdInput: (): Locator =>
      main.getByLabel(E2E_EXTERNAL_GUIDE_COPY.NATIONAL_ID),
    getExpiresOnInput: (): Locator =>
      main.getByLabel(E2E_EXTERNAL_GUIDE_COPY.EXPIRES_ON),
    getPersonalEmailInput: (): Locator =>
      main.getByLabel(
        E2E_EXTERNAL_GUIDE_COPY.PERSONAL_EMAIL
      ),
    getSubmitButton: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_EXTERNAL_GUIDE_COPY.SUBMIT,
        exact: true,
      }),
    getRegisteredNotice: (
      fullName: string,
      nationalId: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.STATUS).filter({
        hasText: E2E_EXTERNAL_GUIDE_COPY.REGISTERED(
          fullName,
          nationalId
        ),
      }),
    getTemporaryPassword: (): Locator =>
      main
        .getByText(TEMPORARY_PASSWORD_BOX_COPY.LABEL, {
          exact: true,
        })
        .locator(E2E_TEMPORARY_PASSWORD_SIBLING),
  };

  return {
    ...locators,
    goTo: async (): Promise<void> => {
      await page.goto(
        PATHS.RESERVATIONS.EXTERNAL_GUIDE_NEW
      );
    },
    goToCalendar: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.CALENDAR);
    },
    register: async ({
      expiresOn,
      fullName,
      nationalId,
      personalEmail,
    }: ExternalGuideRegistrationDetails): Promise<void> => {
      await locators.getFullNameInput().fill(fullName);
      await locators.getNationalIdInput().fill(nationalId);
      await locators.getExpiresOnInput().fill(expiresOn);
      if (personalEmail) {
        await locators
          .getPersonalEmailInput()
          .fill(personalEmail);
      }
      await locators.getSubmitButton().click();
    },
  };
};

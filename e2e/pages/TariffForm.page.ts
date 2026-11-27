import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { TARIFF_FORM_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffFormCopy.constants";
import { TARIFF_TYPE_LABEL } from "@/app/features/administration/tariff-catalog/constants/TariffTypeLabel.constants";
import type { TariffType } from "@/app/features/administration/tariff-catalog/models/TariffType.type";
import { resolveTariffEditPath } from "@/app/features/administration/tariff-catalog/utils/resolveTariffEditPath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";

export const createTariffFormPage = (page: Page) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveTariffEditPath(categoryId));
  };

  const getSection = (type: TariffType): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: TARIFF_TYPE_LABEL[type],
      exact: true,
    });

  const getUsdInput = (type: TariffType): Locator =>
    getSection(type).getByLabel(
      TARIFF_FORM_COPY.USD_LABEL,
      {
        exact: true,
      }
    );

  const getCrcInput = (type: TariffType): Locator =>
    getSection(type).getByLabel(
      TARIFF_FORM_COPY.CRC_LABEL,
      {
        exact: true,
      }
    );

  const getHeading = (categoryName: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      name: categoryName,
    });

  const getHint = (): Locator =>
    page.getByText(TARIFF_FORM_COPY.CHANGE_HINT, {
      exact: true,
    });

  const getMessage = (message: string): Locator =>
    page.getByText(message, { exact: true });

  const getSectionMessage = (
    type: TariffType,
    message: string
  ): Locator =>
    getSection(type).getByText(message, { exact: true });

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const fillUsd = async (
    type: TariffType,
    value: string
  ): Promise<void> => {
    await getUsdInput(type).fill(value);
  };

  const fillCrc = async (
    type: TariffType,
    value: string
  ): Promise<void> => {
    await getCrcInput(type).fill(value);
  };

  const submit = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: TARIFF_FORM_COPY.SAVE_BUTTON,
      })
      .click();
  };

  const back = async (): Promise<void> => {
    await page
      .getByRole(ARIA_ROLE.BUTTON, {
        name: TARIFF_FORM_COPY.BACK_BUTTON,
      })
      .click();
  };

  return {
    back,
    fillCrc,
    fillUsd,
    getCrcInput,
    getHeading,
    getHint,
    getMessage,
    getNotFoundMessage,
    getSectionMessage,
    getUsdInput,
    goTo,
    submit,
  };
};

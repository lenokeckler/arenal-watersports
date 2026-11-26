import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffCatalogCopy.constants";
import { TARIFF_TYPE_LABEL } from "@/app/features/administration/tariff-catalog/constants/TariffTypeLabel.constants";
import type { TariffType } from "@/app/features/administration/tariff-catalog/models/TariffType.type";

const PARENT_SELECTOR = "..";

export const createTariffListPage = (page: Page) => {
  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.ADMINISTRATION.TARIFFS);
  };

  const getCard = (categoryName: string): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, {
      name: categoryName,
      exact: true,
    });

  const getLine = (
    categoryName: string,
    type: TariffType
  ): Locator =>
    getCard(categoryName)
      .getByText(TARIFF_TYPE_LABEL[type], { exact: true })
      .locator(PARENT_SELECTOR);

  const getLineAmounts = (
    categoryName: string,
    type: TariffType,
    amounts: string
  ): Locator =>
    getLine(categoryName, type).getByText(amounts, {
      exact: true,
    });

  const getLineUnit = (
    categoryName: string,
    type: TariffType
  ): Locator =>
    getLine(categoryName, type).getByText(
      TARIFF_CATALOG_COPY.UNIT_PER_HOUR,
      { exact: true }
    );

  const getNoTariffText = (categoryName: string): Locator =>
    getCard(categoryName).getByText(
      TARIFF_CATALOG_COPY.NO_TARIFF,
      { exact: true }
    );

  const getEditLink = (categoryName: string): Locator =>
    getCard(categoryName).getByRole(ARIA_ROLE.LINK, {
      name: TARIFF_CATALOG_COPY.EDIT_LINK,
    });

  const clickEditLink = async (
    categoryName: string
  ): Promise<void> => {
    await getEditLink(categoryName).click();
  };

  return {
    clickEditLink,
    getCard,
    getEditLink,
    getLineAmounts,
    getLineUnit,
    getNoTariffText,
    goTo,
  };
};

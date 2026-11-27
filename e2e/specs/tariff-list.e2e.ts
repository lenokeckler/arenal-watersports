import { expect } from "@playwright/test";
import { TARIFF_CATALOG_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffCatalogCopy.constants";
import { TARIFF_TYPE } from "@/app/features/administration/tariff-catalog/constants/TariffType.constants";
import { formatTariffAmounts } from "@/app/features/administration/tariff-catalog/utils/formatTariffAmounts";
import { resolveTariffEditPath } from "@/app/features/administration/tariff-catalog/utils/resolveTariffEditPath";
import {
  E2E_TARIFF_AMOUNTS,
  E2E_TARIFF_SCENARIO,
  E2E_TARIFF_TYPE_COUNT,
} from "../constants/E2eTariff.constants";
import { test } from "../support/tariffTest";

test.describe("Tariff list", () => {
  test("shows the rental amounts in dollars and colones followed by per hour", async ({
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryName } = await seedTariffCategory({
      rental: E2E_TARIFF_AMOUNTS.LISTED_RENTAL,
      scenario: E2E_TARIFF_SCENARIO.LIST_BOTH_AMOUNTS,
    });

    await listPage.goTo();

    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.RENTAL,
        formatTariffAmounts(
          E2E_TARIFF_AMOUNTS.LISTED_RENTAL
        )
      )
    ).toBeVisible();
    await expect(
      listPage.getLineUnit(categoryName, TARIFF_TYPE.RENTAL)
    ).toBeVisible();
  });

  test("shows no tariff on the type that has none", async ({
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryName } = await seedTariffCategory({
      rental: E2E_TARIFF_AMOUNTS.LISTED_RENTAL,
      scenario: E2E_TARIFF_SCENARIO.LIST_ONE_TYPE,
    });

    await listPage.goTo();

    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.TOUR,
        TARIFF_CATALOG_COPY.NO_TARIFF
      )
    ).toBeVisible();
    await expect(
      listPage.getLineUnit(categoryName, TARIFF_TYPE.TOUR)
    ).toHaveCount(0);
  });

  test("shows no tariff on both lines of a category without tariffs", async ({
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryName } = await seedTariffCategory({
      scenario: E2E_TARIFF_SCENARIO.LIST_NO_TARIFF,
    });

    await listPage.goTo();

    await expect(
      listPage.getNoTariffText(categoryName)
    ).toHaveCount(E2E_TARIFF_TYPE_COUNT);
  });

  test("opens the tariff form from the edit link", async ({
    page,
    listPage,
    formPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.EDIT_LINK,
      });
    await listPage.goTo();

    await listPage.clickEditLink(categoryName);

    await expect(page).toHaveURL(
      resolveTariffEditPath(categoryId)
    );
    await expect(
      formPage.getHeading(categoryName)
    ).toBeVisible();
  });
});

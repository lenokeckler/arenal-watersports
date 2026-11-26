import { expect } from "@playwright/test";
import { COMBO_AUDIENCE } from "@/app/features/administration/combo-catalog/constants/ComboAudience.constants";
import { COMBO_CATALOG_COPY } from "@/app/features/administration/combo-catalog/constants/ComboCatalogCopy.constants";
import { COMBO_STATUS } from "@/app/features/administration/combo-catalog/constants/ComboStatus.constants";
import { COMBO_STATUS_LABEL } from "@/app/features/administration/combo-catalog/constants/ComboStatusLabel.constants";
import {
  E2E_COMBO_SCENARIO,
  E2E_COMBO_SEED,
} from "../constants/E2eComboList.constants";
import { test } from "../support/comboListTest";

test.describe("Combo list", () => {
  test("shows the page heading", async ({
    listPage,
    seedCombo,
  }) => {
    await seedCombo();

    await listPage.goTo();

    await expect(listPage.getHeading()).toHaveText(
      COMBO_CATALOG_COPY.LIST_TITLE
    );
  });

  test("lists a national combo in its section with the price in colones and its equipment", async ({
    listPage,
    seedCombo,
  }) => {
    const { name, priceLabel, itemsSummary } =
      await seedCombo({
        scenario: E2E_COMBO_SCENARIO.NATIONAL_LISTED,
      });

    await listPage.goTo();

    await expect(
      listPage.getCardIn(COMBO_AUDIENCE.NATIONAL, name)
    ).toBeVisible();
    await expect(
      listPage.getCardText(name, priceLabel)
    ).toBeVisible();
    await expect(
      listPage.getCardText(name, itemsSummary)
    ).toBeVisible();
  });

  test("lists a foreign combo in its section with the price in dollars", async ({
    listPage,
    seedCombo,
  }) => {
    const { name, priceLabel } = await seedCombo({
      audience: COMBO_AUDIENCE.FOREIGN,
      price: E2E_COMBO_SEED.PRICE_USD,
      scenario: E2E_COMBO_SCENARIO.FOREIGN_LISTED,
    });

    await listPage.goTo();

    await expect(
      listPage.getCardIn(COMBO_AUDIENCE.FOREIGN, name)
    ).toBeVisible();
    await expect(
      listPage.getCardText(name, priceLabel)
    ).toBeVisible();
  });

  test("shows an inactive combo with the Inactivo chip and Reactivar", async ({
    listPage,
    seedCombo,
  }) => {
    const { name } = await seedCombo({
      scenario: E2E_COMBO_SCENARIO.INACTIVE,
      status: COMBO_STATUS.INACTIVE,
    });

    await listPage.goTo();

    await expect(
      listPage.getCardText(
        name,
        COMBO_STATUS_LABEL[COMBO_STATUS.INACTIVE]
      )
    ).toBeVisible();
    await expect(
      listPage.getReactivateButton(name)
    ).toBeVisible();
  });
});

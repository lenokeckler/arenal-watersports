import { expect } from "@playwright/test";
import { MONEY_AMOUNT_ISSUE, PATHS } from "@/app/constants";
import { COMBO_AUDIENCE } from "@/app/features/administration/combo-catalog/constants/ComboAudience.constants";
import { COMBO_FORM_COPY } from "@/app/features/administration/combo-catalog/constants/ComboFormCopy.constants";
import { COMBO_PRICE_ERROR_COPY } from "@/app/features/administration/combo-catalog/constants/ComboPriceErrorCopy.constants";
import {
  E2E_COMBO_FORM_CATEGORY,
  E2E_COMBO_FORM_ITEMS_SUMMARY,
  E2E_COMBO_FORM_PRICE,
  E2E_COMBO_FORM_QUANTITY,
  E2E_COMBO_FORM_ROW,
  E2E_COMBO_FORM_SCENARIO,
} from "../constants/E2eComboForm.constants";
import { resolveComboFixtureName } from "../constants/E2eComboList.constants";
import { test } from "../support/comboFormTest";
import { formatE2eComboPrice } from "../support/formatE2eComboPrice";

test.describe("Combo form", () => {
  test("creates a national combo with two equipment rows and lists it with the price in colones", async ({
    page,
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.CREATE_NATIONAL
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC.toString()
    );
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.addEquipmentRow();
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.SECOND,
      E2E_COMBO_FORM_CATEGORY.BOAT
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.SECOND,
      E2E_COMBO_FORM_QUANTITY.SECOND.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_FORM_COPY.SAVE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.COMBOS
    );
    await expect(
      listPage.getCardIn(COMBO_AUDIENCE.NATIONAL, name)
    ).toBeVisible();
    await expect(
      listPage.getCardText(
        name,
        formatE2eComboPrice(
          COMBO_AUDIENCE.NATIONAL,
          E2E_COMBO_FORM_PRICE.CRC
        )
      )
    ).toBeVisible();
    await expect(
      listPage.getCardText(
        name,
        E2E_COMBO_FORM_ITEMS_SUMMARY
      )
    ).toBeVisible();
  });

  test("creates a foreign combo with the price asked and listed in dollars", async ({
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.CREATE_FOREIGN
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.chooseAudience(COMBO_AUDIENCE.FOREIGN);

    await expect(
      formPage.getPriceInput(COMBO_AUDIENCE.FOREIGN)
    ).toBeVisible();
    await expect(
      formPage.getPriceInputByPlaceholder(
        COMBO_AUDIENCE.FOREIGN
      )
    ).toBeVisible();

    await formPage.fillPrice(
      COMBO_AUDIENCE.FOREIGN,
      E2E_COMBO_FORM_PRICE.USD.toString()
    );
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.submit();

    await expect(
      listPage.getCardIn(COMBO_AUDIENCE.FOREIGN, name)
    ).toBeVisible();
    await expect(
      listPage.getCardText(
        name,
        formatE2eComboPrice(
          COMBO_AUDIENCE.FOREIGN,
          E2E_COMBO_FORM_PRICE.USD
        )
      )
    ).toBeVisible();
  });

  test("refuses an empty name and saves nothing", async ({
    page,
    formPage,
  }) => {
    await formPage.goToCreate();

    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC.toString()
    );
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_FORM_COPY.NAME_REQUIRED_ERROR
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.COMBOS_NEW
    );
  });

  test("refuses a missing price and saves nothing", async ({
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.NO_PRICE
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_PRICE_ERROR_COPY[COMBO_AUDIENCE.NATIONAL]
          .required
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });

  test("refuses a price of zero and saves nothing", async ({
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.ZERO_PRICE
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.ZERO.toString()
    );
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_PRICE_ERROR_COPY[COMBO_AUDIENCE.NATIONAL]
          .issues[MONEY_AMOUNT_ISSUE.NOT_POSITIVE]
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });

  test("refuses a combo without equipment rows and saves nothing", async ({
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.NO_EQUIPMENT
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC.toString()
    );
    await formPage.removeRow(E2E_COMBO_FORM_ROW.FIRST);
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_FORM_COPY.ITEMS_REQUIRED_ERROR
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });

  test("refuses a repeated equipment category and saves nothing", async ({
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.DUPLICATED_CATEGORY
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC.toString()
    );
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      E2E_COMBO_FORM_QUANTITY.FIRST.toString()
    );
    await formPage.addEquipmentRow();
    await formPage.chooseCategory(
      E2E_COMBO_FORM_ROW.SECOND,
      E2E_COMBO_FORM_CATEGORY.JET_SKI
    );
    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.SECOND,
      E2E_COMBO_FORM_QUANTITY.SECOND.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        COMBO_FORM_COPY.CATEGORY_DUPLICATED_ERROR
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });

  test("edits a never sold combo with its audience read only and lists the new name and price", async ({
    formPage,
    listPage,
    seedCombo,
  }, testInfo) => {
    const { id } = await seedCombo({
      scenario: E2E_COMBO_FORM_SCENARIO.EDIT_NEVER_SOLD,
    });
    const newName = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.EDIT_NEVER_SOLD_RENAMED
    );
    await formPage.goToEdit(id);

    await expect(
      formPage.getLockedAudience(COMBO_AUDIENCE.NATIONAL)
    ).toBeVisible();
    await expect(
      formPage.getAudienceButton(COMBO_AUDIENCE.FOREIGN)
    ).toHaveCount(0);

    await formPage.fillName(newName);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC_EDITED.toString()
    );
    await formPage.submit();

    await expect(
      listPage.getCardIn(COMBO_AUDIENCE.NATIONAL, newName)
    ).toBeVisible();
    await expect(
      listPage.getCardText(
        newName,
        formatE2eComboPrice(
          COMBO_AUDIENCE.NATIONAL,
          E2E_COMBO_FORM_PRICE.CRC_EDITED
        )
      )
    ).toBeVisible();
  });

  test("lets a sold combo change its name and price", async ({
    formPage,
    listPage,
    seedSoldCombo,
  }, testInfo) => {
    const { id } = await seedSoldCombo({
      scenario: E2E_COMBO_FORM_SCENARIO.EDIT_SOLD,
    });
    const newName = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.EDIT_SOLD_RENAMED
    );
    await formPage.goToEdit(id);

    await formPage.fillName(newName);
    await formPage.fillPrice(
      COMBO_AUDIENCE.NATIONAL,
      E2E_COMBO_FORM_PRICE.CRC_EDITED.toString()
    );
    await formPage.submit();

    await expect(
      listPage.getCardText(
        newName,
        formatE2eComboPrice(
          COMBO_AUDIENCE.NATIONAL,
          E2E_COMBO_FORM_PRICE.CRC_EDITED
        )
      )
    ).toBeVisible();
  });

  test("refuses to change the equipment of a sold combo and keeps what was typed", async ({
    formPage,
    seedSoldCombo,
  }) => {
    const { id } = await seedSoldCombo({
      scenario: E2E_COMBO_FORM_SCENARIO.EDIT_SOLD_EQUIPMENT,
    });
    const changedQuantity =
      E2E_COMBO_FORM_QUANTITY.CHANGED.toString();
    await formPage.goToEdit(id);

    await formPage.fillQuantity(
      E2E_COMBO_FORM_ROW.FIRST,
      changedQuantity
    );
    await formPage.submit();

    await expect(
      formPage.getBanner(
        COMBO_FORM_COPY.SOLD_COMBO_LOCKED_ERROR
      )
    ).toBeVisible();
    await expect(
      formPage.getQuantityInput(E2E_COMBO_FORM_ROW.FIRST)
    ).toHaveValue(changedQuantity);
  });

  test("goes back to the list without saving", async ({
    page,
    formPage,
    listPage,
    trackCreatedComboName,
  }, testInfo) => {
    const name = resolveComboFixtureName(
      testInfo.project.name,
      E2E_COMBO_FORM_SCENARIO.BACK
    );
    trackCreatedComboName(name);
    await formPage.goToCreate();

    await formPage.fillName(name);
    await formPage.back();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.COMBOS
    );
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });
});

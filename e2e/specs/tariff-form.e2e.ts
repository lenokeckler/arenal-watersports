import { expect } from "@playwright/test";
import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  PATHS,
  STRING,
} from "@/app/constants";
import { TARIFF_CATALOG_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffCatalogCopy.constants";
import { TARIFF_FORM_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffFormCopy.constants";
import { TARIFF_PRICE_ERROR_COPY } from "@/app/features/administration/tariff-catalog/constants/TariffPriceErrorCopy.constants";
import { TARIFF_TYPE } from "@/app/features/administration/tariff-catalog/constants/TariffType.constants";
import { formatTariffAmounts } from "@/app/features/administration/tariff-catalog/utils/formatTariffAmounts";
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_TARIFF_AMOUNTS,
  E2E_TARIFF_INPUT,
  E2E_TARIFF_SCENARIO,
  E2E_TARIFF_TYPE_COUNT,
} from "../constants/E2eTariff.constants";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { test } from "../support/tariffTest";

test.describe("Tariff form", () => {
  test("saves a rental tariff in dollars and colones and lists both amounts", async ({
    page,
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.SAVE_RENTAL,
      });
    await formPage.goTo(categoryId);

    await formPage.fillUsd(
      TARIFF_TYPE.RENTAL,
      E2E_TARIFF_AMOUNTS.LISTED_RENTAL.usd.toString()
    );
    await formPage.fillCrc(
      TARIFF_TYPE.RENTAL,
      E2E_TARIFF_AMOUNTS.LISTED_RENTAL.crc.toString()
    );
    await formPage.submit();

    await expect(
      formPage.getMessage(
        TARIFF_FORM_COPY.SAVE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.TARIFFS
    );
    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.RENTAL,
        formatTariffAmounts(
          E2E_TARIFF_AMOUNTS.LISTED_RENTAL
        )
      )
    ).toBeVisible();
  });

  test("saves a tour tariff in colones only", async ({
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.SAVE_TOUR_CRC,
      });
    await formPage.goTo(categoryId);

    await formPage.fillCrc(
      TARIFF_TYPE.TOUR,
      E2E_TARIFF_AMOUNTS.LISTED_TOUR.crc.toString()
    );
    await formPage.submit();

    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.TOUR,
        formatTariffAmounts(E2E_TARIFF_AMOUNTS.LISTED_TOUR)
      )
    ).toBeVisible();
    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.RENTAL,
        TARIFF_CATALOG_COPY.NO_TARIFF
      )
    ).toBeVisible();
  });

  test("changes one price of an existing tariff and keeps the other", async ({
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        rental: E2E_TARIFF_AMOUNTS.EXISTING_RENTAL,
        scenario: E2E_TARIFF_SCENARIO.EDIT_EXISTING,
      });
    await formPage.goTo(categoryId);

    await formPage.fillUsd(
      TARIFF_TYPE.RENTAL,
      E2E_TARIFF_AMOUNTS.EDITED_RENTAL.usd.toString()
    );
    await formPage.submit();

    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.RENTAL,
        formatTariffAmounts(
          E2E_TARIFF_AMOUNTS.EDITED_RENTAL
        )
      )
    ).toBeVisible();
  });

  test("refuses a price that is not a number and saves nothing", async ({
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.INVALID_TEXT,
      });
    await formPage.goTo(categoryId);

    await formPage.fillUsd(
      TARIFF_TYPE.RENTAL,
      E2E_TARIFF_INPUT.INVALID_TEXT
    );
    await formPage.submit();

    await expect(
      formPage.getSectionMessage(
        TARIFF_TYPE.RENTAL,
        TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.USD][
          MONEY_AMOUNT_ISSUE.FORMAT
        ]
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(
      listPage.getNoTariffText(categoryName)
    ).toHaveCount(E2E_TARIFF_TYPE_COUNT);
  });

  test("refuses a price of zero and saves nothing", async ({
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.ZERO_PRICE,
      });
    await formPage.goTo(categoryId);

    await formPage.fillCrc(
      TARIFF_TYPE.TOUR,
      E2E_TARIFF_INPUT.ZERO
    );
    await formPage.submit();

    await expect(
      formPage.getSectionMessage(
        TARIFF_TYPE.TOUR,
        TARIFF_PRICE_ERROR_COPY[CURRENCY_CODE.CRC][
          MONEY_AMOUNT_ISSUE.NOT_POSITIVE
        ]
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(
      listPage.getNoTariffText(categoryName)
    ).toHaveCount(E2E_TARIFF_TYPE_COUNT);
  });

  test("refuses to empty a type that already has a tariff and saves nothing", async ({
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        rental: E2E_TARIFF_AMOUNTS.EXISTING_RENTAL,
        scenario: E2E_TARIFF_SCENARIO.MISSING_PRICE,
      });
    await formPage.goTo(categoryId);

    await formPage.fillUsd(
      TARIFF_TYPE.RENTAL,
      STRING.Empty
    );
    await formPage.fillCrc(
      TARIFF_TYPE.RENTAL,
      STRING.Empty
    );
    await formPage.submit();

    await expect(
      formPage.getSectionMessage(
        TARIFF_TYPE.RENTAL,
        TARIFF_FORM_COPY.TYPE_PRICE_REQUIRED_ERROR
      )
    ).toBeVisible();
    await listPage.goTo();
    await expect(
      listPage.getLineAmounts(
        categoryName,
        TARIFF_TYPE.RENTAL,
        formatTariffAmounts(
          E2E_TARIFF_AMOUNTS.EXISTING_RENTAL
        )
      )
    ).toBeVisible();
  });

  test("tells that changing a tariff does not change what was already charged", async ({
    formPage,
    seedTariffCategory,
  }) => {
    const { categoryId } = await seedTariffCategory({
      scenario: E2E_TARIFF_SCENARIO.CHANGE_HINT,
    });

    await formPage.goTo(categoryId);

    await expect(formPage.getHint()).toBeVisible();
  });

  test("goes back to the list without saving", async ({
    page,
    formPage,
    listPage,
    seedTariffCategory,
  }) => {
    const { categoryId, categoryName } =
      await seedTariffCategory({
        scenario: E2E_TARIFF_SCENARIO.BACK,
      });
    await formPage.goTo(categoryId);

    await formPage.fillUsd(
      TARIFF_TYPE.RENTAL,
      E2E_TARIFF_AMOUNTS.LISTED_RENTAL.usd.toString()
    );
    await formPage.back();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.TARIFFS
    );
    await expect(
      listPage.getNoTariffText(categoryName)
    ).toHaveCount(E2E_TARIFF_TYPE_COUNT);
  });

  test("shows the not found page for an unknown category", async ({
    page,
    formPage,
  }) => {
    await logInAsAdmin(page);

    await formPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      formPage.getNotFoundMessage()
    ).toBeVisible();
  });
});

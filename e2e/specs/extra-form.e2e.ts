import { expect } from "@playwright/test";
import {
  CURRENCY_CODE,
  CURRENCY_SYMBOL,
  PATHS,
  STRING,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_MODE } from "@/app/features/administration/extra-catalog/constants/ExtraFormMode.constants";
import { EXTRA_FORM_TITLE } from "@/app/features/administration/extra-catalog/constants/ExtraFormModeCopy.constants";
import { resolveExtraEditPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraEditPath";
import {
  E2E_ARIA_INVALID_ATTRIBUTE,
  E2E_ARIA_INVALID_TRUE,
  E2E_BLANK_EXTRA_NAME,
  E2E_EXTRA_FORM_DUPLICATE_PADDING,
  E2E_EXTRA_FORM_SCENARIO,
  E2E_EXTRA_PRICE_TEXT,
  E2E_INVALID_EXTRA_PRICES,
  E2E_MALFORMED_EXTRA_ID,
  E2E_UNKNOWN_EXTRA_ID,
} from "../constants/E2eExtraForm.constants";
import {
  E2E_EXTRA_SEED_PRICE,
  resolveExtraFixtureName,
} from "../constants/E2eExtraList.constants";
import { E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX } from "../constants/E2eOneHandedUse.constants";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import { countExtrasNamed } from "../support/extraFixtures";
import { formatE2eExtraPrice } from "../support/formatE2eExtraPrice";
import { test } from "../support/extraFormTest";

test.describe("Extra form", () => {
  test("creates an extra with only a dollar price, shows the success toast and lists it with that price", async ({
    page,
    formPage,
    listPage,
    trackCreatedExtraName,
  }, testInfo) => {
    const name = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_FORM_SCENARIO.CREATE
    );
    trackCreatedExtraName(name);
    await formPage.goTo();

    await formPage.fillName(name);
    await formPage.fillPrice(
      CURRENCY_CODE.USD,
      E2E_EXTRA_PRICE_TEXT.USD
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(
      formPage.getToastMessage(
        EXTRA_CATALOG_COPY.CREATE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(listPage.getExtraCard(name)).toBeVisible();
    await expect(
      listPage.getExtraPrice(
        name,
        formatE2eExtraPrice(
          CURRENCY_CODE.USD,
          E2E_EXTRA_PRICE_TEXT.USD
        )
      )
    ).toBeVisible();
    await expect(
      listPage.getExtraCard(name)
    ).not.toContainText(CURRENCY_SYMBOL[CURRENCY_CODE.CRC]);
  });

  test("creates an extra with both prices and lists both on its card", async ({
    page,
    formPage,
    listPage,
    trackCreatedExtraName,
  }, testInfo) => {
    const name = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_FORM_SCENARIO.CREATE_BOTH_PRICES
    );
    trackCreatedExtraName(name);
    await formPage.goTo();

    await formPage.fillName(name);
    await formPage.fillPrice(
      CURRENCY_CODE.USD,
      E2E_EXTRA_PRICE_TEXT.USD
    );
    await formPage.fillPrice(
      CURRENCY_CODE.CRC,
      E2E_EXTRA_PRICE_TEXT.CRC
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraPrice(
        name,
        formatE2eExtraPrice(
          CURRENCY_CODE.USD,
          E2E_EXTRA_PRICE_TEXT.USD
        )
      )
    ).toBeVisible();
    await expect(
      listPage.getExtraPrice(
        name,
        formatE2eExtraPrice(
          CURRENCY_CODE.CRC,
          E2E_EXTRA_PRICE_TEXT.CRC
        )
      )
    ).toBeVisible();
  });

  test("shows the prices required error and creates nothing when no price is given", async ({
    page,
    formPage,
    trackCreatedExtraName,
  }, testInfo) => {
    const name = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_FORM_SCENARIO.CREATE_NO_PRICE
    );
    trackCreatedExtraName(name);
    await formPage.goTo();

    await formPage.fillName(name);
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(
      formPage.getPricesRequiredError()
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
    expect(await countExtrasNamed(name)).toBe(0);
  });

  for (const invalidPrice of E2E_INVALID_EXTRA_PRICES) {
    test(`shows the price error and creates nothing when the dollar price is ${invalidPrice.text}`, async ({
      page,
      formPage,
      trackCreatedExtraName,
    }, testInfo) => {
      const name = resolveExtraFixtureName(
        testInfo.project.name,
        E2E_EXTRA_FORM_SCENARIO.CREATE_INVALID_PRICE
      );
      trackCreatedExtraName(name);
      await formPage.goTo();

      await formPage.fillName(name);
      await formPage.fillPrice(
        CURRENCY_CODE.USD,
        invalidPrice.text
      );
      await formPage.submit(
        EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
      );

      await expect(
        formPage.getPriceError(CURRENCY_CODE.USD)
      ).toHaveText(invalidPrice.expectedError);
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.EXTRAS_NEW
      );
      expect(await countExtrasNamed(name)).toBe(0);
    });
  }

  test("shows the required error and creates nothing when the name is empty", async ({
    page,
    formPage,
  }) => {
    await formPage.goTo();

    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(formPage.getNameError()).toHaveText(
      EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
    );
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
    expect(await countExtrasNamed(STRING.Empty)).toBe(0);
  });

  test("shows the required error and creates nothing when the name is only spaces", async ({
    page,
    formPage,
  }) => {
    await formPage.goTo();

    await formPage.fillName(E2E_BLANK_EXTRA_NAME);
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(formPage.getNameError()).toHaveText(
      EXTRA_CATALOG_COPY.NAME_REQUIRED_ERROR
    );
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
    expect(await countExtrasNamed(STRING.Empty)).toBe(0);
  });

  test("rejects a name that differs only by capitalization and spaces on the name field", async ({
    page,
    formPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_FORM_SCENARIO.DUPLICATE,
    });
    const duplicateName = `${E2E_EXTRA_FORM_DUPLICATE_PADDING}${name.toUpperCase()}${E2E_EXTRA_FORM_DUPLICATE_PADDING}`;
    await formPage.goTo();

    await formPage.fillName(duplicateName);
    await formPage.fillPrice(
      CURRENCY_CODE.USD,
      E2E_EXTRA_PRICE_TEXT.USD
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(formPage.getNameError()).toHaveText(
      EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR
    );
    await expect(formPage.getNameInput()).toHaveAttribute(
      E2E_ARIA_INVALID_ATTRIBUTE,
      E2E_ARIA_INVALID_TRUE
    );
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS_NEW
    );
    expect(await countExtrasNamed(name)).toBe(1);
  });

  test("renames an extra and the list shows the new name", async ({
    page,
    formPage,
    listPage,
    seedExtra,
  }, testInfo) => {
    const { id, name } = await seedExtra({
      scenario: E2E_EXTRA_FORM_SCENARIO.EDIT,
    });
    const renamed = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_FORM_SCENARIO.EDIT_RENAMED
    );
    await formPage.goTo(resolveExtraEditPath(id));
    await expect(formPage.getNameInput()).toHaveValue(name);

    await formPage.fillName(renamed);
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_EDIT
    );

    await expect(
      formPage.getToastMessage(
        EXTRA_CATALOG_COPY.UPDATE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraCard(renamed)
    ).toBeVisible();
    await expect(listPage.getExtraCard(name)).toHaveCount(
      0
    );
  });

  test("preloads the prices of an extra, changes them and the list shows the new price", async ({
    page,
    formPage,
    listPage,
    seedExtra,
  }) => {
    const { id, name } = await seedExtra({
      priceCrc: E2E_EXTRA_SEED_PRICE.CRC,
      scenario: E2E_EXTRA_FORM_SCENARIO.EDIT_PRICE,
    });
    await formPage.goTo(resolveExtraEditPath(id));
    await expect(
      formPage.getPriceInput(CURRENCY_CODE.USD)
    ).toHaveValue(`${E2E_EXTRA_SEED_PRICE.USD}`);
    await expect(
      formPage.getPriceInput(CURRENCY_CODE.CRC)
    ).toHaveValue(`${E2E_EXTRA_SEED_PRICE.CRC}`);

    await formPage.fillPrice(
      CURRENCY_CODE.USD,
      E2E_EXTRA_PRICE_TEXT.USD_EDITED
    );
    await formPage.fillPrice(
      CURRENCY_CODE.CRC,
      STRING.Empty
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_EDIT
    );

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraPrice(
        name,
        formatE2eExtraPrice(
          CURRENCY_CODE.USD,
          E2E_EXTRA_PRICE_TEXT.USD_EDITED
        )
      )
    ).toBeVisible();
    await expect(
      listPage.getExtraCard(name)
    ).not.toContainText(CURRENCY_SYMBOL[CURRENCY_CODE.CRC]);
  });

  test("returns to the list without changes when cancelling an edit", async ({
    page,
    formPage,
    seedExtra,
  }, testInfo) => {
    const { id, name } = await seedExtra({
      scenario: E2E_EXTRA_FORM_SCENARIO.CANCEL,
    });
    const typedName = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_FORM_SCENARIO.EDIT_RENAMED
    );
    await formPage.goTo(resolveExtraEditPath(id));

    await formPage.fillName(typedName);
    await formPage.cancel();

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    expect(await countExtrasNamed(name)).toBe(1);
    expect(await countExtrasNamed(typedName)).toBe(0);
  });

  test("answers not found for an unknown extra id", async ({
    formPage,
  }) => {
    await formPage.goTo(
      resolveExtraEditPath(E2E_UNKNOWN_EXTRA_ID)
    );

    await expect(
      formPage.getNotFoundMessage()
    ).toBeVisible();
    await expect(
      formPage.getHeading(
        EXTRA_FORM_TITLE[EXTRA_FORM_MODE.EDIT]
      )
    ).toHaveCount(0);
  });

  test("answers not found for a malformed extra id", async ({
    formPage,
  }) => {
    await formPage.goTo(
      resolveExtraEditPath(E2E_MALFORMED_EXTRA_ID)
    );

    await expect(
      formPage.getNotFoundMessage()
    ).toBeVisible();
    await expect(
      formPage.getHeading(
        EXTRA_FORM_TITLE[EXTRA_FORM_MODE.EDIT]
      )
    ).toHaveCount(0);
  });

  test("keeps the name input and the submit button tall enough to tap on mobile", async ({
    formPage,
  }, testInfo) => {
    test.skip(testInfo.project.name !== E2E_PROJECT.MOBILE);
    await formPage.goTo();

    const inputBox = await formPage
      .getNameInput()
      .boundingBox();
    const submitBox = await formPage
      .getSubmitButton(
        EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
      )
      .boundingBox();

    expect(inputBox?.height).toBeGreaterThanOrEqual(
      E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
    );
    expect(submitBox?.height).toBeGreaterThanOrEqual(
      E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
    );
  });
});

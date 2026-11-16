import { expect } from "@playwright/test";
import {
  CURRENCY_CODE,
  PATHS,
  POSTGRES_ERROR_CODE,
} from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_OCCUPANCY_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraOccupancyCopy.constants";
import { resolveExtraEditPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraEditPath";
import { E2E_EXTRA_PRICE_TEXT } from "../constants/E2eExtraForm.constants";
import {
  E2E_EXTRA_OCCUPANCY_QUANTITY,
  E2E_EXTRA_OCCUPANCY_RENAME_SUFFIX,
  E2E_EXTRA_OCCUPANCY_SCENARIO,
  E2E_OCCUPIED_CATEGORY_NAME,
} from "../constants/E2eExtraOccupancy.constants";
import { resolveExtraFixtureName } from "../constants/E2eExtraList.constants";
import { E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX } from "../constants/E2eOneHandedUse.constants";
import { tryChangeExtraOccupiedQuantity } from "../support/extraOccupancyFixtures";
import { test } from "../support/extraOccupancyTest";

test.describe("Extra occupancy", () => {
  test("creates an extra that occupies two boards and shows what it occupies on its card", async ({
    page,
    formPage,
    listPage,
    occupiableCategoryId,
    trackCreatedExtraName,
  }, testInfo) => {
    const name = resolveExtraFixtureName(
      testInfo.project.name,
      E2E_EXTRA_OCCUPANCY_SCENARIO.CREATE
    );
    trackCreatedExtraName(name);
    await formPage.goTo();

    await formPage.fillName(name);
    await formPage.fillPrice(
      CURRENCY_CODE.USD,
      E2E_EXTRA_PRICE_TEXT.USD
    );
    await formPage.enableOccupancy();
    await formPage.chooseCategory(occupiableCategoryId);
    await formPage.fillQuantity(
      `${E2E_EXTRA_OCCUPANCY_QUANTITY.CREATED}`
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_CREATE
    );

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraOccupancyLabel(
        name,
        EXTRA_OCCUPANCY_COPY.OCCUPIES_LABEL(
          E2E_EXTRA_OCCUPANCY_QUANTITY.CREATED,
          E2E_OCCUPIED_CATEGORY_NAME
        )
      )
    ).toBeVisible();
  });

  test("says only an additional charge for an extra that occupies nothing", async ({
    formPage: _formPage,
    listPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_OCCUPANCY_SCENARIO.CHARGE_ONLY,
    });
    await listPage.goTo();

    await expect(
      listPage.getExtraOccupancyLabel(
        name,
        EXTRA_OCCUPANCY_COPY.CHARGE_ONLY_LABEL
      )
    ).toBeVisible();
  });

  test("changes the quantity of an extra no reservation uses", async ({
    page,
    formPage,
    listPage,
    occupiableCategoryId,
    seedExtra,
  }) => {
    const { id, name } = await seedExtra({
      scenario: E2E_EXTRA_OCCUPANCY_SCENARIO.EDIT,
      occupiesCategoryId: occupiableCategoryId,
      occupiesQuantity: E2E_EXTRA_OCCUPANCY_QUANTITY.SEEDED,
    });
    await formPage.goTo(resolveExtraEditPath(id));

    await expect(
      formPage.getOccupancyToggle()
    ).toBeChecked();
    await expect(formPage.getQuantityInput()).toHaveValue(
      `${E2E_EXTRA_OCCUPANCY_QUANTITY.SEEDED}`
    );
    await formPage.fillQuantity(
      `${E2E_EXTRA_OCCUPANCY_QUANTITY.EDITED}`
    );
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_EDIT
    );

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraOccupancyLabel(
        name,
        EXTRA_OCCUPANCY_COPY.OCCUPIES_LABEL(
          E2E_EXTRA_OCCUPANCY_QUANTITY.EDITED,
          E2E_OCCUPIED_CATEGORY_NAME
        )
      )
    ).toBeVisible();
  });

  test("locks the occupancy of an extra a reservation uses, refuses the change and still renames it", async ({
    page,
    formPage,
    listPage,
    occupiableCategoryId,
    seedUsedExtra,
  }) => {
    const { id, name } = await seedUsedExtra({
      scenario: E2E_EXTRA_OCCUPANCY_SCENARIO.USED,
      occupiesCategoryId: occupiableCategoryId,
      occupiesQuantity: E2E_EXTRA_OCCUPANCY_QUANTITY.SEEDED,
    });
    await formPage.goTo(resolveExtraEditPath(id));

    await expect(
      formPage.getOccupancyToggle()
    ).toBeDisabled();
    await expect(
      formPage.getCategorySelect()
    ).toBeDisabled();
    await expect(
      formPage.getQuantityInput()
    ).toBeDisabled();
    await expect(formPage.getLockedNote()).toBeVisible();
    expect(
      await tryChangeExtraOccupiedQuantity(
        id,
        E2E_EXTRA_OCCUPANCY_QUANTITY.REFUSED
      )
    ).toBe(
      POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE
    );

    const renamed = `${name}${E2E_EXTRA_OCCUPANCY_RENAME_SUFFIX}`;
    await formPage.fillName(renamed);
    await formPage.submit(
      EXTRA_CATALOG_COPY.SUBMIT_BUTTON_EDIT
    );

    await expect(page).toHaveURL(
      PATHS.ADMINISTRATION.EXTRAS
    );
    await expect(
      listPage.getExtraOccupancyLabel(
        renamed,
        EXTRA_OCCUPANCY_COPY.OCCUPIES_LABEL(
          E2E_EXTRA_OCCUPANCY_QUANTITY.SEEDED,
          E2E_OCCUPIED_CATEGORY_NAME
        )
      )
    ).toBeVisible();
  });

  test("keeps the occupancy controls at least as tall as the one handed use minimum", async ({
    formPage,
  }) => {
    await formPage.goTo();
    await formPage.enableOccupancy();

    const selectBox = await formPage
      .getCategorySelect()
      .boundingBox();
    const quantityBox = await formPage
      .getQuantityInput()
      .boundingBox();

    expect(selectBox?.height).toBeGreaterThanOrEqual(
      E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
    );
    expect(quantityBox?.height).toBeGreaterThanOrEqual(
      E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
    );
  });
});

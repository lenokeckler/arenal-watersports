import { expect } from "@playwright/test";
import { UNIT_CATALOG_COPY } from "@/app/features/administration/unit-catalog/constants/UnitCatalogCopy.constants";
import { UNIT_FORM_MODE } from "@/app/features/administration/unit-catalog/constants/UnitFormMode.constants";
import { UNIT_STATUS } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { resolveCategoryUnitsPath } from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { test } from "../support/categoryUnitsTest";
import { readUnit } from "../support/unitFixtures";
import {
  E2E_MOTORIZED_CATEGORY,
  E2E_UNIT_DEFAULT_INPUT,
  E2E_UNIT_MOTOR_INPUT,
  E2E_UNIT_STORED,
} from "../constants/E2eCategoryUnits.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

test.describe("Category units create", () => {
  test("creates a unit in a motorized category with an empty fuel reading stored as null", async ({
    page,
    formPage,
    listPage,
    seedUnitCategory,
  }) => {
    const { categoryId, code } = await seedUnitCategory(
      "create-motor",
      E2E_MOTORIZED_CATEGORY
    );

    await formPage.goTo(categoryId);
    await formPage.fill({
      ...E2E_UNIT_DEFAULT_INPUT,
      ...E2E_UNIT_MOTOR_INPUT,
      code,
    });

    await expect(formPage.getStatusSelect()).toHaveValue(
      UNIT_STATUS.AVAILABLE
    );

    await formPage.submit(UNIT_FORM_MODE.CREATE);

    await expect(
      formPage.getToastMessage(
        UNIT_CATALOG_COPY.CREATE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(page).toHaveURL(
      resolveCategoryUnitsPath(categoryId)
    );
    await expect(listPage.getUnitCard(code)).toBeVisible();
    expect(await readUnit(code)).toMatchObject({
      fuel_level: null,
      fuel_max: E2E_UNIT_STORED.FUEL_MAX,
      next_oil_change_at:
        E2E_UNIT_STORED.NEXT_OIL_CHANGE_AT,
      usage_total: E2E_UNIT_STORED.USAGE_TOTAL,
    });
  });

  test("a category without a motor hides the fuel, usage and oil fields", async ({
    formPage,
    seedUnitCategory,
  }) => {
    const { categoryId } =
      await seedUnitCategory("create-kayak");

    await formPage.goTo(categoryId);

    await expect(formPage.getCodeInput()).toBeVisible();
    await expect(formPage.getFuelMaxInput()).toBeVisible();
    await expect(formPage.getFuelLevelInput()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(formPage.getUsageInput()).toHaveCount(
      E2E_COUNT.NONE
    );
    await expect(
      formPage.getNextOilChangeInput()
    ).toHaveCount(E2E_COUNT.NONE);
  });
});

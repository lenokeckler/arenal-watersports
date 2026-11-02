import { expect } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "@/app/features/administration/unit-catalog/constants/UnitCatalogCopy.constants";
import { UNIT_FORM_FIELD_ID } from "@/app/features/administration/unit-catalog/constants/UnitFormFieldId.constants";
import { UNIT_FORM_MODE } from "@/app/features/administration/unit-catalog/constants/UnitFormMode.constants";
import { UNIT_STATUS } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { resolveCategoryUnitsPath } from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { test } from "../support/categoryUnitsTest";
import { countUnitsOfCategory } from "../support/unitFixtures";
import { E2E_UNIT_INVALID_INPUT_CASES } from "../constants/E2eCategoryUnitCases.constants";
import {
  E2E_MOTORIZED_CATEGORY,
  E2E_UNIT_DEFAULT_INPUT,
} from "../constants/E2eCategoryUnits.constants";
import { E2E_UNKNOWN_CATEGORY_ID } from "../constants/E2eCategoryBehavior.constants";
import {
  E2E_COUNT,
  E2E_SIGNED_OUT_STORAGE_STATE,
} from "../constants/E2eRuntime.constants";

test.describe("Category units guards", () => {
  test("a duplicate code shows the field error and creates nothing", async ({
    formPage,
    seedUnitCategory,
  }) => {
    const {
      categoryId,
      categoryName,
      codes: [code],
    } = await seedUnitCategory("duplicate", {}, [
      UNIT_STATUS.AVAILABLE,
    ]);

    await formPage.goTo(categoryId);
    await formPage.fill({ code });
    await formPage.submit(UNIT_FORM_MODE.CREATE);

    await expect(
      formPage.getFieldError(UNIT_FORM_FIELD_ID.CODE)
    ).toHaveText(UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR);
    expect(await countUnitsOfCategory(categoryName)).toBe(
      E2E_COUNT.ONE
    );
  });

  for (const invalidCase of E2E_UNIT_INVALID_INPUT_CASES) {
    test(`invalid input shows the error under its field and saves nothing (${invalidCase.scenario})`, async ({
      formPage,
      seedUnitCategory,
    }) => {
      const { categoryId, categoryName, code } =
        await seedUnitCategory(
          invalidCase.scenario,
          E2E_MOTORIZED_CATEGORY
        );

      await formPage.goTo(categoryId);
      await formPage.fill({
        ...E2E_UNIT_DEFAULT_INPUT,
        code,
        ...invalidCase.input,
      });
      await formPage.submit(UNIT_FORM_MODE.CREATE);

      await expect(
        formPage.getFieldError(invalidCase.fieldId)
      ).toHaveText(invalidCase.errorText);
      expect(await countUnitsOfCategory(categoryName)).toBe(
        E2E_COUNT.NONE
      );
    });
  }

  test("Cancelar returns to the unit list", async ({
    page,
    formPage,
    seedUnitCategory,
  }) => {
    const { categoryId } = await seedUnitCategory("cancel");

    await formPage.goTo(categoryId);
    await formPage.cancel();

    await expect(page).toHaveURL(
      resolveCategoryUnitsPath(categoryId)
    );
  });

  test.describe("Signed-out visitor", () => {
    test.use({
      storageState: E2E_SIGNED_OUT_STORAGE_STATE,
    });

    test("sends a signed-out visitor to the login", async ({
      page,
      formPage,
    }) => {
      await formPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    });
  });
});

import { UNIT_FORM_FIELD_ID } from "@/app/features/administration/unit-catalog/constants/UnitFormFieldId.constants";
import { UNIT_FORM_MODE } from "@/app/features/administration/unit-catalog/constants/UnitFormMode.constants";
import { createCategoryListPage } from "../pages/CategoryList.page";
import { captureFullPage } from "../support/captureFullPage";
import { test } from "../support/categoryUnitsTest";
import { readUnit } from "../support/unitFixtures";
import {
  E2E_CATEGORY_UNITS_SCREENSHOT_STATE,
  E2E_MOTORIZED_CATEGORY,
  E2E_UNIT_SCREENSHOT_STATUSES,
  resolveCategoryUnitsScreenshotBasename,
} from "../constants/E2eCategoryUnits.constants";

test.describe("Category units screenshots", () => {
  test("captures the list, the create form with an error and the decommission panel", async ({
    page,
    formPage,
    listPage,
    seedUnitCategory,
  }, testInfo) => {
    const {
      categoryId,
      categoryName,
      codes: [firstCode],
    } = await seedUnitCategory(
      "screenshot",
      E2E_MOTORIZED_CATEGORY,
      E2E_UNIT_SCREENSHOT_STATUSES
    );
    const capture = async (
      state: string
    ): Promise<void> => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureFullPage(
        page,
        resolveCategoryUnitsScreenshotBasename(state),
        testInfo.project.name
      );
    };

    await createCategoryListPage(page).goTo();
    await listPage
      .getUnitsLink(
        createCategoryListPage(page).getCategoryCard(
          categoryName
        )
      )
      .waitFor();
    await capture(
      E2E_CATEGORY_UNITS_SCREENSHOT_STATE.CARD_LINK
    );

    await listPage.goTo(categoryId);
    await listPage.getHeading(categoryName).waitFor();
    await capture(E2E_CATEGORY_UNITS_SCREENSHOT_STATE.LIST);

    await formPage.goTo(categoryId);
    await formPage.submit(UNIT_FORM_MODE.CREATE);
    await formPage
      .getFieldError(UNIT_FORM_FIELD_ID.CODE)
      .waitFor();
    await capture(
      E2E_CATEGORY_UNITS_SCREENSHOT_STATE.CREATE_ERROR
    );

    await formPage.goTo(
      categoryId,
      (await readUnit(firstCode)).id
    );
    await formPage.openDecommission();
    await formPage.getReasonInput().waitFor();
    await capture(
      E2E_CATEGORY_UNITS_SCREENSHOT_STATE.DECOMMISSION
    );
  });
});

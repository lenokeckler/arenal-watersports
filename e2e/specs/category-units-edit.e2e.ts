import { expect } from "@playwright/test";
import { UNIT_CATALOG_COPY } from "@/app/features/administration/unit-catalog/constants/UnitCatalogCopy.constants";
import { UNIT_FORM_ERROR_COPY } from "@/app/features/administration/unit-catalog/constants/UnitFormErrorCopy.constants";
import { UNIT_FORM_FIELD_ID } from "@/app/features/administration/unit-catalog/constants/UnitFormFieldId.constants";
import { UNIT_FORM_MODE } from "@/app/features/administration/unit-catalog/constants/UnitFormMode.constants";
import {
  UNIT_EFFECTIVE_STATUS,
  UNIT_STATUS,
} from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { resolveCategoryUnitsPath } from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { test } from "../support/categoryUnitsTest";
import { readUnit } from "../support/unitFixtures";
import {
  E2E_MOTORIZED_CATEGORY,
  E2E_UNIT_DECOMMISSION_REASON,
  E2E_UNIT_DIMMED_OPACITY,
  E2E_UNIT_ZERO_READING,
} from "../constants/E2eCategoryUnits.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

test.describe("Category units edit", () => {
  test("keeps a status change and a zero fuel reading after a reload", async ({
    formPage,
    seedUnitCategory,
  }) => {
    const {
      categoryId,
      codes: [code],
    } = await seedUnitCategory(
      "edit",
      E2E_MOTORIZED_CATEGORY,
      [UNIT_STATUS.AVAILABLE]
    );
    const { id: unitId } = await readUnit(code);

    await formPage.goTo(categoryId, unitId);
    await formPage.selectStatus(
      UNIT_EFFECTIVE_STATUS.IN_MAINTENANCE
    );
    await formPage.fill({
      fuelLevel: E2E_UNIT_ZERO_READING,
    });
    await formPage.submit(UNIT_FORM_MODE.EDIT);

    await expect(
      formPage.getToastMessage(
        UNIT_CATALOG_COPY.UPDATE_SUCCESS_TOAST
      )
    ).toBeVisible();

    await formPage.goTo(categoryId, unitId);

    await expect(formPage.getStatusSelect()).toHaveValue(
      UNIT_STATUS.IN_MAINTENANCE
    );
    await expect(formPage.getFuelLevelInput()).toHaveValue(
      E2E_UNIT_ZERO_READING
    );
    expect(await readUnit(code)).toMatchObject({
      fuel_level: Number(E2E_UNIT_ZERO_READING),
      status: UNIT_STATUS.IN_MAINTENANCE,
    });
  });

  test("decommissions a unit with a reason and leaves it read-only", async ({
    page,
    formPage,
    listPage,
    seedUnitCategory,
  }) => {
    const {
      categoryId,
      codes: [code],
    } = await seedUnitCategory("decommission", {}, [
      UNIT_STATUS.AVAILABLE,
    ]);
    const { id: unitId } = await readUnit(code);

    await formPage.goTo(categoryId, unitId);
    await formPage.openDecommission();
    await formPage.confirmDecommission();

    await expect(
      formPage.getFieldError(UNIT_FORM_FIELD_ID.REASON)
    ).toHaveText(UNIT_FORM_ERROR_COPY.REASON_REQUIRED);

    await formPage.fillReason(E2E_UNIT_DECOMMISSION_REASON);
    await formPage.confirmDecommission();

    await expect(page).toHaveURL(
      resolveCategoryUnitsPath(categoryId)
    );
    await expect(
      listPage.getUnitStatus(
        code,
        UNIT_EFFECTIVE_STATUS.DECOMMISSIONED
      )
    ).toBeVisible();
    await expect(listPage.getUnitCard(code)).toHaveCSS(
      "opacity",
      E2E_UNIT_DIMMED_OPACITY
    );
    await expect(listPage.getEditLink(code)).toHaveCount(
      E2E_COUNT.NONE
    );

    const decommissioned = await readUnit(code);
    expect(decommissioned).toMatchObject({
      decommission_reason: E2E_UNIT_DECOMMISSION_REASON,
      status: UNIT_STATUS.DECOMMISSIONED,
    });
    expect(decommissioned.decommissioned_at).not.toBeNull();

    await formPage.goTo(categoryId, unitId);

    await expect(
      formPage.getDecommissionedNotice()
    ).toBeVisible();
  });
});

import { expect } from "@playwright/test";
import { COMBO_CATALOG_COPY } from "@/app/features/administration/combo-catalog/constants/ComboCatalogCopy.constants";
import { COMBO_REMOVAL_OUTCOME } from "@/app/features/administration/combo-catalog/constants/ComboRemovalOutcome.constants";
import { COMBO_REMOVAL_OUTCOME_COPY } from "@/app/features/administration/combo-catalog/constants/ComboRemovalOutcomeCopy.constants";
import { COMBO_STATUS } from "@/app/features/administration/combo-catalog/constants/ComboStatus.constants";
import { COMBO_STATUS_LABEL } from "@/app/features/administration/combo-catalog/constants/ComboStatusLabel.constants";
import { E2E_COMBO_SCENARIO } from "../constants/E2eComboList.constants";
import { test } from "../support/comboListTest";

test.describe("Combo removal", () => {
  test("deletes a never sold combo after the sheet confirmation", async ({
    listPage,
    seedCombo,
  }) => {
    const { name } = await seedCombo({
      scenario: E2E_COMBO_SCENARIO.REMOVE_UNSOLD,
    });
    await listPage.goTo();

    await listPage.removeCombo(name);

    await expect(
      listPage.getToastMessage(
        COMBO_REMOVAL_OUTCOME_COPY[
          COMBO_REMOVAL_OUTCOME.DELETED
        ]
      )
    ).toBeVisible();
    await expect(listPage.getComboCard(name)).toHaveCount(
      0
    );
  });

  test("marks a sold combo inactive and offers Reactivar", async ({
    listPage,
    seedSoldCombo,
  }) => {
    const { name } = await seedSoldCombo({
      scenario: E2E_COMBO_SCENARIO.REMOVE_SOLD,
    });
    await listPage.goTo();

    await listPage.removeCombo(name);

    await expect(
      listPage.getToastMessage(
        COMBO_REMOVAL_OUTCOME_COPY[
          COMBO_REMOVAL_OUTCOME.DEACTIVATED
        ]
      )
    ).toBeVisible();
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

  test("reactivates an inactive combo", async ({
    listPage,
    seedCombo,
  }) => {
    const { name } = await seedCombo({
      scenario: E2E_COMBO_SCENARIO.REACTIVATE,
      status: COMBO_STATUS.INACTIVE,
    });
    await listPage.goTo();

    await listPage.getReactivateButton(name).click();

    await expect(
      listPage.getToastMessage(
        COMBO_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(
      listPage.getCardText(
        name,
        COMBO_STATUS_LABEL[COMBO_STATUS.ACTIVE]
      )
    ).toBeVisible();
  });
});

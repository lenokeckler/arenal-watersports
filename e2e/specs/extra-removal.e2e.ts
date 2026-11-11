import { expect } from "@playwright/test";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { EXTRA_REMOVAL_OUTCOME } from "@/app/features/administration/extra-catalog/constants/ExtraRemovalOutcome.constants";
import { EXTRA_REMOVAL_OUTCOME_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraRemovalOutcomeCopy.constants";
import { EXTRA_STATUS } from "@/app/features/administration/extra-catalog/constants/ExtraStatus.constants";
import { EXTRA_STATUS_LABEL } from "@/app/features/administration/extra-catalog/constants/ExtraStatusLabel.constants";
import { E2E_EXTRA_SCENARIO } from "../constants/E2eExtraList.constants";
import { test } from "../support/extraListTest";
import { reservationExists } from "../support/extraUsageFixtures";

test.describe("Extra removal", () => {
  test("deletes an unused extra after the confirmation states the rule", async ({
    listPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.REMOVE_UNUSED,
    });
    await listPage.goTo();

    await listPage.getRemoveButton(name).click();
    await expect(
      listPage.getRemovalConfirmMessage(name)
    ).toBeVisible();
    await listPage.getRemoveButton(name).click();

    await expect(
      listPage.getToastMessage(
        EXTRA_REMOVAL_OUTCOME_COPY[
          EXTRA_REMOVAL_OUTCOME.DELETED
        ]
      )
    ).toBeVisible();
    await expect(listPage.getExtraCard(name)).toHaveCount(
      0
    );
  });

  test("deactivates a used extra and keeps its reservation", async ({
    listPage,
    seedUsedExtra,
  }) => {
    const { name, reservationId } = await seedUsedExtra({
      scenario: E2E_EXTRA_SCENARIO.REMOVE_USED,
    });
    await listPage.goTo();

    await listPage.getRemoveButton(name).click();
    await listPage.getRemoveButton(name).click();

    await expect(
      listPage.getToastMessage(
        EXTRA_REMOVAL_OUTCOME_COPY[
          EXTRA_REMOVAL_OUTCOME.DEACTIVATED
        ]
      )
    ).toBeVisible();
    await expect(
      listPage.getExtraStatusChip(
        name,
        EXTRA_STATUS_LABEL[EXTRA_STATUS.INACTIVE]
      )
    ).toBeVisible();
    await expect(
      listPage.getReactivateButton(name)
    ).toBeVisible();
    expect(await reservationExists(reservationId)).toBe(
      true
    );
  });

  test("reactivates an inactive extra", async ({
    listPage,
    seedExtra,
  }) => {
    const { name } = await seedExtra({
      scenario: E2E_EXTRA_SCENARIO.REACTIVATE,
      status: EXTRA_STATUS.INACTIVE,
    });
    await listPage.goTo();

    await listPage.getReactivateButton(name).click();

    await expect(
      listPage.getToastMessage(
        EXTRA_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(
      listPage.getExtraStatusChip(
        name,
        EXTRA_STATUS_LABEL[EXTRA_STATUS.ACTIVE]
      )
    ).toBeVisible();
  });
});

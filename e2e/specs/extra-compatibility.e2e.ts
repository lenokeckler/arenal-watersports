import { expect } from "@playwright/test";
import { EXTRA_COMPATIBILITY_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCompatibilityCopy.constants";
import { buildExtraCompatibilityLabel } from "@/app/features/administration/extra-catalog/utils/buildExtraCompatibilityLabel";
import { buildExtraCompatibilityProgressLabel } from "@/app/features/administration/extra-catalog/utils/buildExtraCompatibilityProgressLabel";
import {
  E2E_COMPATIBILITY_CATEGORY_UNIT_COUNT,
  E2E_COMPATIBILITY_LINKED_COUNT,
  E2E_COMPATIBILITY_OTHER_UNIT_STATUSES,
  E2E_COMPATIBILITY_SCENARIO,
  E2E_COMPATIBILITY_UNIT_INDEX,
  E2E_COMPATIBILITY_UNIT_STATUSES,
} from "../constants/E2eExtraCompatibility.constants";
import { E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX } from "../constants/E2eOneHandedUse.constants";
import { test } from "../support/extraCompatibilityTest";

const mainProgress = (linkedCount: number): string =>
  buildExtraCompatibilityProgressLabel(
    linkedCount,
    E2E_COMPATIBILITY_CATEGORY_UNIT_COUNT.MAIN
  );

const otherProgress = (linkedCount: number): string =>
  buildExtraCompatibilityProgressLabel(
    linkedCount,
    E2E_COMPATIBILITY_CATEGORY_UNIT_COUNT.OTHER
  );

test.describe("Extra compatibility", () => {
  test("sets the units of a category from the extras list and keeps them after reopening", async ({
    categoriesPage,
    extraListPage,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.JOURNEY
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.JOURNEY,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );
    const checkedCode =
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.FIRST];
    const freeCode =
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.SECOND];

    await extraListPage.goTo();
    await expect(
      extraListPage.getExtraCompatibilityLabel(
        extra.name,
        buildExtraCompatibilityLabel(
          E2E_COMPATIBILITY_LINKED_COUNT.NONE
        )
      )
    ).toBeVisible();
    await extraListPage
      .getExtraCompatibilityLink(extra.name)
      .click();

    await expect(categoriesPage.getHeading()).toBeVisible();
    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.NONE)
      )
    ).toBeVisible();
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();

    await expect(unitsPage.getHeading()).toBeVisible();
    await expect(
      unitsPage.getInstruction(
        extra.name,
        category.categoryName
      )
    ).toBeVisible();
    await expect(unitsPage.getSaveButton()).toBeDisabled();
    await unitsPage.selectUnit(checkedCode);
    await unitsPage.getSaveButton().click();

    await expect(
      unitsPage.getToastMessage(
        EXTRA_COMPATIBILITY_COPY.SAVE_SUCCESS_TOAST
      )
    ).toBeVisible();
    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.ONE)
      )
    ).toBeVisible();

    await categoriesPage.goTo(extra.id);
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    await expect(
      unitsPage.getUnitCheckbox(checkedCode)
    ).toBeChecked();
    await expect(
      unitsPage.getUnitCheckbox(freeCode)
    ).not.toBeChecked();

    await extraListPage.goTo();
    await expect(
      extraListPage.getExtraCompatibilityLabel(
        extra.name,
        buildExtraCompatibilityLabel(
          E2E_COMPATIBILITY_LINKED_COUNT.ONE
        )
      )
    ).toBeVisible();
  });

  test("keeps the links the extra has in another category when one category is saved", async ({
    categoriesPage,
    linkExtraToUnits,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.OTHER_CATEGORY_KEEPS_LINKS
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.OTHER_CATEGORY_KEEPS_LINKS,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );
    const otherCategory = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.OTHER_CATEGORY,
      {},
      E2E_COMPATIBILITY_OTHER_UNIT_STATUSES
    );
    await linkExtraToUnits(extra.id, [
      otherCategory.codes[
        E2E_COMPATIBILITY_UNIT_INDEX.FIRST
      ],
    ]);

    await categoriesPage.goTo(extra.id);
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    await unitsPage.selectUnit(
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.FIRST]
    );
    await unitsPage.getSaveButton().click();

    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.ONE)
      )
    ).toBeVisible();
    await expect(
      categoriesPage.getCategoryProgress(
        otherCategory.categoryName,
        otherProgress(
          E2E_COMPATIBILITY_LINKED_COUNT.OTHER_CATEGORY_ONE
        )
      )
    ).toBeVisible();
  });

  test("clears the links with Quitar todas and shows Sin embarcaciones on the card", async ({
    categoriesPage,
    linkExtraToUnits,
    extraListPage,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.CLEAR
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.CLEAR,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );
    await linkExtraToUnits(extra.id, [
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.FIRST],
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.SECOND],
    ]);

    await categoriesPage.goTo(extra.id);
    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.TWO)
      )
    ).toBeVisible();
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    await unitsPage.clearAllUnits();
    await unitsPage.getSaveButton().click();

    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.NONE)
      )
    ).toBeVisible();

    await extraListPage.goTo();
    await expect(
      extraListPage.getExtraCompatibilityLabel(
        extra.name,
        buildExtraCompatibilityLabel(
          E2E_COMPATIBILITY_LINKED_COUNT.NONE
        )
      )
    ).toBeVisible();
  });

  test("checks every unit with Marcar todas and saves them", async ({
    categoriesPage,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.HELPERS
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.HELPERS,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );

    await categoriesPage.goTo(extra.id);
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    await unitsPage.selectAllUnits();
    await unitsPage.getSaveButton().click();

    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.ALL)
      )
    ).toBeVisible();
  });

  test("goes back with Regresar without saving the changes", async ({
    categoriesPage,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.CANCEL
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.CANCEL,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );

    await categoriesPage.goTo(extra.id);
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    await unitsPage.selectUnit(
      category.codes[E2E_COMPATIBILITY_UNIT_INDEX.FIRST]
    );
    await unitsPage.getBackButton().click();

    await expect(
      categoriesPage.getCategoryProgress(
        category.categoryName,
        mainProgress(E2E_COMPATIBILITY_LINKED_COUNT.NONE)
      )
    ).toBeVisible();
  });

  test("keeps every tap target at least 44 px tall", async ({
    categoriesPage,
    seedCompatibleExtra,
    seedUnitCategory,
    unitsPage,
  }) => {
    const extra = await seedCompatibleExtra(
      E2E_COMPATIBILITY_SCENARIO.TAP_TARGETS
    );
    const category = await seedUnitCategory(
      E2E_COMPATIBILITY_SCENARIO.TAP_TARGETS,
      {},
      E2E_COMPATIBILITY_UNIT_STATUSES
    );

    await categoriesPage.goTo(extra.id);
    const categoryBox = await categoriesPage
      .getCategoryLink(category.categoryName)
      .boundingBox();
    await categoriesPage
      .getCategoryLink(category.categoryName)
      .click();
    const unitBoxes = await Promise.all(
      category.codes.map((code) =>
        unitsPage.getUnitRow(code).boundingBox()
      )
    );
    const helperBoxes = await Promise.all([
      unitsPage.getSelectAllButton().boundingBox(),
      unitsPage.getClearAllButton().boundingBox(),
      unitsPage.getBackButton().boundingBox(),
    ]);

    [categoryBox, ...unitBoxes, ...helperBoxes].forEach(
      (box) => {
        expect(box?.height).toBeGreaterThanOrEqual(
          E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
        );
      }
    );
  });
});

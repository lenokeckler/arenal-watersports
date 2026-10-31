import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import {
  E2E_BEHAVIOR_DURATION_MINUTES,
  E2E_MALFORMED_CATEGORY_ID,
  E2E_UNKNOWN_CATEGORY_ID,
  resolveCategoryBehaviorFixtureName,
} from "../constants/E2eCategoryBehavior.constants";

test.describe("Category behavior persistence and access", () => {
  test("saves a valid change, shows the success toast, returns to the list and keeps it when reopened", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "save"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      const categoryId = await findCategoryId(categoryName);
      await categoryBehaviorFormPage.goTo(categoryId);
      await categoryBehaviorFormPage.checkIsReservable();
      await categoryBehaviorFormPage.checkGuideOnly();
      await categoryBehaviorFormPage.fillDuration(
        E2E_BEHAVIOR_DURATION_MINUTES
      );
      await categoryBehaviorFormPage.submit();

      await expect(
        categoryBehaviorFormPage.getToastMessage(
          CATEGORY_CATALOG_COPY.BEHAVIOR_UPDATE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );

      await categoryBehaviorFormPage.goTo(categoryId);

      await expect(
        categoryBehaviorFormPage.getIsReservableCheckbox()
      ).toBeChecked();
      await expect(
        categoryBehaviorFormPage.getGuideOnlyCheckbox()
      ).toBeChecked();
      await expect(
        categoryBehaviorFormPage.getDurationInput()
      ).toHaveValue(E2E_BEHAVIOR_DURATION_MINUTES);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("Cancelar returns to the category list", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryBehaviorFixtureName(
      testInfo.project.name,
      "cancel"
    );
    await seedCategoryWithBehavior(categoryName);
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await categoryBehaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );
      await categoryBehaviorFormPage.cancel();

      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("an unknown category id shows the not-found page", async ({
    page,
  }) => {
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    await logInAsAdmin(page);
    await categoryBehaviorFormPage.goTo(
      E2E_UNKNOWN_CATEGORY_ID
    );

    await expect(
      categoryBehaviorFormPage.getNotFoundMessage()
    ).toBeVisible();
    await expect(
      categoryBehaviorFormPage.getHeading()
    ).toHaveCount(0);
  });

  test("a malformed category id shows the not-found page", async ({
    page,
  }) => {
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    await logInAsAdmin(page);
    await categoryBehaviorFormPage.goTo(
      E2E_MALFORMED_CATEGORY_ID
    );

    await expect(
      categoryBehaviorFormPage.getNotFoundMessage()
    ).toBeVisible();
  });

  test("sends a signed-out visitor to the login", async ({
    page,
  }) => {
    const categoryBehaviorFormPage =
      createCategoryBehaviorFormPage(page);

    await categoryBehaviorFormPage.goTo(
      E2E_UNKNOWN_CATEGORY_ID
    );

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  });
});

import { expect, test } from "@playwright/test";
import { CATEGORY_IMAGE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryImageCopy.constants";
import {
  E2E_CATEGORY_IMAGE_FILE,
  resolveCategoryImageFixtureName,
} from "../constants/E2eCategoryImage.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createCategoryImagePage } from "../pages/CategoryImage.page";
import { createCategoryListPage } from "../pages/CategoryList.page";
import {
  readCategoryImagePath,
  removeCategoryWithImages,
} from "../support/categoryImageFixtures";
import {
  findCategoryId,
  seedDeletableCategory,
} from "../support/categoryFixtures";
import { logInAsAdmin } from "../support/logInAsAdmin";

test.describe("Category image", () => {
  test("opens from the Imagen link of the card with the no-image state", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryImageFixtureName(
      testInfo.project.name,
      "open"
    );
    await seedDeletableCategory(categoryName);
    const categoryListPage = createCategoryListPage(page);
    const imagePage = createCategoryImagePage(page);

    try {
      await logInAsAdmin(page);
      await categoryListPage.goToCategory(categoryName);
      await imagePage.clickImageLink(
        categoryListPage.getCategoryCard(categoryName)
      );

      await expect(imagePage.getHeading()).toBeVisible();
      await expect(
        imagePage.getEmptyPreview()
      ).toBeVisible();
      await expect(
        imagePage.getButton(CATEGORY_IMAGE_COPY.SAVE_BUTTON)
      ).toHaveCount(E2E_COUNT.NONE);
    } finally {
      await removeCategoryWithImages(categoryName);
    }
  });

  test("previews, saves and replaces the image, then removes it after confirming", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryImageFixtureName(
      testInfo.project.name,
      "lifecycle"
    );
    await seedDeletableCategory(categoryName);
    const imagePage = createCategoryImagePage(page);

    try {
      await logInAsAdmin(page);
      const categoryId = await findCategoryId(categoryName);
      await imagePage.goTo(categoryId);

      await imagePage.chooseFile(
        E2E_CATEGORY_IMAGE_FILE.PNG
      );
      await expect(
        imagePage.getPreviewImage(
          CATEGORY_IMAGE_COPY.PREVIEW_ALT_PICKED
        )
      ).toBeVisible();
      await imagePage.clickNamedButton(
        CATEGORY_IMAGE_COPY.SAVE_BUTTON
      );

      await expect(
        imagePage.getToastMessage(
          CATEGORY_IMAGE_COPY.SAVE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(
        imagePage.getPreviewImage(
          CATEGORY_IMAGE_COPY.PREVIEW_ALT_SAVED
        )
      ).toBeVisible();
      await expect
        .poll(() =>
          imagePage.isImageLoaded(
            CATEGORY_IMAGE_COPY.PREVIEW_ALT_SAVED
          )
        )
        .toBe(true);
      const firstPath =
        await readCategoryImagePath(categoryName);
      expect(firstPath).not.toBeNull();

      await imagePage.chooseFile(
        E2E_CATEGORY_IMAGE_FILE.PNG
      );
      await imagePage.clickNamedButton(
        CATEGORY_IMAGE_COPY.SAVE_BUTTON
      );
      await expect
        .poll(() => readCategoryImagePath(categoryName))
        .not.toBe(firstPath);

      await imagePage.clickNamedButton(
        CATEGORY_IMAGE_COPY.REMOVE_BUTTON
      );
      await expect(
        imagePage.getButton(
          CATEGORY_IMAGE_COPY.REMOVE_CONFIRM_BUTTON
        )
      ).toBeVisible();
      await imagePage.clickNamedButton(
        CATEGORY_IMAGE_COPY.REMOVE_CONFIRM_BUTTON
      );

      await expect(
        imagePage.getToastMessage(
          CATEGORY_IMAGE_COPY.REMOVE_SUCCESS_TOAST
        )
      ).toBeVisible();
      await expect(
        imagePage.getEmptyPreview()
      ).toBeVisible();
      expect(
        await readCategoryImagePath(categoryName)
      ).toBeNull();
    } finally {
      await removeCategoryWithImages(categoryName);
    }
  });

  test("shows the error and offers no save for a file that is not an image", async ({
    page,
  }, testInfo) => {
    const categoryName = resolveCategoryImageFixtureName(
      testInfo.project.name,
      "invalid"
    );
    await seedDeletableCategory(categoryName);
    const imagePage = createCategoryImagePage(page);

    try {
      await logInAsAdmin(page);
      await imagePage.goTo(
        await findCategoryId(categoryName)
      );

      await imagePage.chooseFile(
        E2E_CATEGORY_IMAGE_FILE.TEXT
      );

      await expect(imagePage.getAlert()).toHaveText(
        CATEGORY_IMAGE_COPY.FILE_UNSUPPORTED_TYPE_ERROR
      );
      await expect(
        imagePage.getButton(CATEGORY_IMAGE_COPY.SAVE_BUTTON)
      ).toHaveCount(E2E_COUNT.NONE);
    } finally {
      await removeCategoryWithImages(categoryName);
    }
  });
});

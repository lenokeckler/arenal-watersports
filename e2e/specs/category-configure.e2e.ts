import { expect, test } from "@playwright/test";
import { LENGTH, PATHS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureCopy.constants";
import { formatCategoryDurationLabel } from "@/app/features/administration/category-catalog/utils/formatCategoryDurationLabel";
import { E2E_CATEGORY_IMAGE_FILE } from "../constants/E2eCategoryImage.constants";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { openCategoryConfigureScreen } from "../support/openCategoryConfigureScreen";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import {
  E2E_ALERT_QUANTITY_TEXT,
  E2E_DEPOSIT_USD_TEXT,
  E2E_PICKED_DURATION_MINUTES,
  resolveCategoryConfigureFixtureName,
} from "../constants/E2eCategoryConfigure.constants";

const E2E_SECTION_COUNT = 6;
const {
  DELETE_CATEGORY_BUTTON,
  DEPOSIT_USD_FIELD_LABEL,
  HAS_MOTOR_FIELD_LABEL,
} = CATEGORY_CATALOG_COPY;
const {
  ALERTS_QUANTITY_FIELD_LABEL,
  DELETE_CONFIRM,
  SECTION_PHOTO,
  ALERTS_TYPE_QUANTITY,
  SECTION_ALERTS,
  SECTION_DEPOSIT,
  SECTION_TRAITS,
  TRAIT_HAS_MOTOR,
} = CATEGORY_CONFIGURE_COPY;

test.describe("Category configure screen", () => {
  test("shows the status card and the six sections, and opens and closes one", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "sections"
      );
    await seedCategoryWithBehavior(categoryName);
    const configurePage = createCategoryConfigurePage(page);
    const photoSection = configurePage.getSectionButton(
      CATEGORY_CONFIGURE_COPY.SECTION_PHOTO
    );

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(
        configurePage.getHeading(categoryName)
      ).toBeVisible();
      await expect(
        configurePage.getActiveSwitch()
      ).toBeDisabled();
      await expect(
        configurePage.getSectionHeadings()
      ).toHaveCount(E2E_SECTION_COUNT);
      await expect(
        configurePage.getSectionButton(
          CATEGORY_CONFIGURE_COPY.SECTION_RESERVATIONS
        )
      ).toHaveAttribute("aria-expanded", STRING.TRUE);

      await configurePage.toggleSection(
        CATEGORY_CONFIGURE_COPY.SECTION_PHOTO
      );
      await expect(photoSection).toHaveAttribute(
        "aria-expanded",
        STRING.TRUE
      );

      await configurePage.toggleSection(
        CATEGORY_CONFIGURE_COPY.SECTION_PHOTO
      );
      await expect(photoSection).toHaveAttribute(
        "aria-expanded",
        STRING.FALSE
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("edits the reservations section and the summary follows", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "reservations"
      );
    await seedCategoryWithBehavior(categoryName);
    const configurePage = createCategoryConfigurePage(page);
    const bookableSwitch = configurePage.getSwitch(
      CATEGORY_CONFIGURE_COPY.BOOKABLE_LABEL
    );
    const reservationsSection =
      configurePage.getSectionButton(
        CATEGORY_CONFIGURE_COPY.SECTION_RESERVATIONS
      );

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(reservationsSection).toContainText(
        CATEGORY_CONFIGURE_COPY.RESERVATIONS_NOT_RESERVABLE
      );
      await bookableSwitch.click();
      await configurePage
        .getChip(
          formatCategoryDurationLabel(
            E2E_PICKED_DURATION_MINUTES
          )
        )
        .click();
      await expect(reservationsSection).toContainText(
        formatCategoryDurationLabel(
          E2E_PICKED_DURATION_MINUTES
        )
      );
      await expect(
        configurePage.getDurationField()
      ).toHaveCount(LENGTH.ZERO);

      await configurePage
        .getChip(CATEGORY_CONFIGURE_COPY.DURATION_OTHER)
        .click();
      await expect(
        configurePage.getDurationField()
      ).toBeVisible();

      await bookableSwitch.click();
      await expect(reservationsSection).toContainText(
        CATEGORY_CONFIGURE_COPY.RESERVATIONS_NOT_RESERVABLE
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("edits the deposit section and the summary follows", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "deposit"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.toggleSection(SECTION_DEPOSIT);
      await configurePage
        .getField(DEPOSIT_USD_FIELD_LABEL)
        .fill(E2E_DEPOSIT_USD_TEXT);

      await expect(
        configurePage.getSectionButton(SECTION_DEPOSIT)
      ).toContainText(E2E_DEPOSIT_USD_TEXT);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("edits the alerts section and the summary follows", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "alerts"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.toggleSection(SECTION_ALERTS);
      await configurePage
        .getChip(ALERTS_TYPE_QUANTITY)
        .click();
      await configurePage
        .getField(ALERTS_QUANTITY_FIELD_LABEL)
        .fill(E2E_ALERT_QUANTITY_TEXT);

      await expect(
        configurePage.getSectionButton(SECTION_ALERTS)
      ).toContainText(E2E_ALERT_QUANTITY_TEXT);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("edits the traits section and the summary follows", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "traits"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.toggleSection(SECTION_TRAITS);
      await configurePage
        .getField(HAS_MOTOR_FIELD_LABEL)
        .check();

      await expect(
        configurePage.getSectionButton(SECTION_TRAITS)
      ).toContainText(TRAIT_HAS_MOTOR);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("previews a picked photo", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "photo"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.toggleSection(SECTION_PHOTO);
      await configurePage.choosePhoto(
        E2E_CATEGORY_IMAGE_FILE.PNG
      );

      await expect(
        configurePage.getPhotoPreview()
      ).toBeVisible();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("deletes a category without records after confirming and returns to the list", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "delete"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage
        .getButton(DELETE_CATEGORY_BUTTON)
        .click();
      await configurePage
        .getButton(DELETE_CONFIRM(categoryName))
        .click();

      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
      await expect(
        findCategoryId(categoryName)
      ).rejects.toThrow();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("Regresar returns to the category list", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "back"
      );
    await seedCategoryWithBehavior(categoryName);
    const configurePage = createCategoryConfigurePage(page);

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );
      await configurePage.getBackLink().click();

      await expect(page).toHaveURL(
        PATHS.ADMINISTRATION.CATEGORIES
      );
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("the previous behavior screen of the same category still loads", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "old-route"
      );
    await seedCategoryWithBehavior(categoryName);
    const behaviorFormPage =
      createCategoryBehaviorFormPage(page);

    try {
      await logInAsAdmin(page);
      await behaviorFormPage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(
        behaviorFormPage.getHeading()
      ).toBeVisible();
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});

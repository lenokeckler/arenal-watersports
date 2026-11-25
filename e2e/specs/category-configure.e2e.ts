import { expect, test } from "@playwright/test";
import { LENGTH, PATHS, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { CATEGORY_CONFIGURE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureCopy.constants";
import { CATEGORY_CONFIGURE_NEXT_STEP_ID } from "@/app/features/administration/category-catalog/constants/CategoryConfigureNextStepId.constants";
import { CATEGORY_CONFIGURE_NEXT_STEPS_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureNextStepsCopy.constants";
import { CATEGORY_TRACKING_MODE } from "@/app/features/administration/category-catalog/constants/CategoryTrackingMode.constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureSaveCopy.constants";
import { formatCategoryDurationLabel } from "@/app/features/administration/category-catalog/utils/formatCategoryDurationLabel";
import { E2E_CATEGORY_IMAGE_FILE } from "../constants/E2eCategoryImage.constants";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { addCategoryImage } from "../support/addCategoryImage";
import { removeCategoryImage } from "../support/removeCategoryImage";
import { removeCategoryWithStock } from "../support/stockFixtures";
import { setCategoryStockQuantity } from "../support/setCategoryStockQuantity";
import { logInAsAdmin } from "../support/logInAsAdmin";
import { openCategoryConfigureScreen } from "../support/openCategoryConfigureScreen";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import {
  E2E_ALERT_EXPIRY_DAYS_TEXT,
  E2E_ALERT_QUANTITY_TEXT,
  E2E_DURATION_STEP_DONE_COUNT,
  E2E_INTERNAL_REQUIRED_STEPS,
  E2E_NEW_CATEGORY_DURATION_MINUTES,
  E2E_NO_STEPS_DONE,
  E2E_RESERVABLE_REQUIRED_STEPS,
  E2E_STOCK_QUANTITY,
  E2E_STOCK_STEP_DONE_COUNT,
  E2E_DEPOSIT_USD_TEXT,
  E2E_PICKED_DURATION_MINUTES,
  E2E_UNSAVED_CHANGE_COUNT,
  resolveCategoryConfigureFixtureName,
} from "../constants/E2eCategoryConfigure.constants";

const E2E_SECTION_COUNT = 6;
const E2E_NEW_RESERVABLE_CATEGORY = {
  defaultDurationMinutes: E2E_NEW_CATEGORY_DURATION_MINUTES,
  isReservable: true,
  trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
};
const { PROGRESS } = CATEGORY_CONFIGURE_NEXT_STEPS_COPY;
const { DEPOSIT, PHOTO, STOCK } =
  CATEGORY_CONFIGURE_NEXT_STEP_ID;
const {
  DELETE_CATEGORY_BUTTON,
  DEPOSIT_USD_FIELD_LABEL,
  HAS_MOTOR_FIELD_LABEL,
} = CATEGORY_CATALOG_COPY;
const { DIRTY_PLURAL, RETRY, SAVE, SAVED } =
  CATEGORY_CONFIGURE_SAVE_COPY;
const {
  ALERTS_EXPIRY_FIELD_LABEL,
  BOOKABLE_LABEL,
  GUIDE_ONLY_LABEL,
  LEAVE_DISCARD,
  ALERTS_QUANTITY_FIELD_LABEL,
  DELETE_CONFIRM,
  SECTION_PHOTO,
  ALERTS_TYPE_BOTH,
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
      ).toBeEnabled();
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
      await configurePage.getChip(ALERTS_TYPE_BOTH).click();
      await configurePage
        .getField(ALERTS_QUANTITY_FIELD_LABEL)
        .fill(E2E_ALERT_QUANTITY_TEXT);
      await configurePage
        .getField(ALERTS_EXPIRY_FIELD_LABEL)
        .fill(E2E_ALERT_EXPIRY_DAYS_TEXT);

      const alertsSection =
        configurePage.getSectionButton(SECTION_ALERTS);
      await expect(alertsSection).toContainText(
        E2E_ALERT_QUANTITY_TEXT
      );
      await expect(alertsSection).toContainText(
        E2E_ALERT_EXPIRY_DAYS_TEXT
      );
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

  test("saves the reservations edits with Guardar cambios and keeps them after reloading", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "save"
      );
    const durationLabel = formatCategoryDurationLabel(
      E2E_PICKED_DURATION_MINUTES
    );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.getSwitch(BOOKABLE_LABEL).click();
      await configurePage.getChip(durationLabel).click();
      await configurePage
        .getSwitch(GUIDE_ONLY_LABEL)
        .click();
      await expect(
        configurePage.getStatusMessage(
          DIRTY_PLURAL(E2E_UNSAVED_CHANGE_COUNT)
        )
      ).toBeVisible();

      await configurePage.getButton(SAVE).click();
      await expect(
        configurePage.getStatusMessage(SAVED)
      ).toBeVisible();

      await page.reload();
      await expect(
        configurePage.getSwitch(BOOKABLE_LABEL)
      ).toHaveAttribute("aria-checked", STRING.TRUE);
      await expect(
        configurePage.getChip(durationLabel)
      ).toHaveAttribute("aria-pressed", STRING.TRUE);
      await expect(
        configurePage.getSwitch(GUIDE_ONLY_LABEL)
      ).toHaveAttribute("aria-checked", STRING.TRUE);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("keeps the edits after a failed save and saves them on Reintentar", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "retry"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.getSwitch(BOOKABLE_LABEL).click();
      await configurePage
        .getChip(
          formatCategoryDurationLabel(
            E2E_PICKED_DURATION_MINUTES
          )
        )
        .click();

      await page.context().setOffline(true);
      await configurePage.getButton(SAVE).click();
      await expect(
        configurePage.getFailureAlert()
      ).toBeVisible();
      await expect(
        configurePage.getSwitch(BOOKABLE_LABEL)
      ).toHaveAttribute("aria-checked", STRING.TRUE);

      await page.context().setOffline(false);
      await configurePage.getButton(RETRY).click();
      await expect(
        configurePage.getStatusMessage(SAVED)
      ).toBeVisible();
    } finally {
      await page.context().setOffline(false);
      await removeDeletableCategory(categoryName);
    }
  });

  test("Regresar with unsaved changes asks first and Regresar sin guardar goes to the list", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "leave"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );
      await configurePage.getSwitch(BOOKABLE_LABEL).click();
      await configurePage.getBackButton().click();
      await expect(
        configurePage.getLeaveSheet()
      ).toBeVisible();

      await configurePage.getButton(LEAVE_DISCARD).click();

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

  test("a new reservable category lists its pending steps and Agregar opens the photo section", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "next-steps"
      );
    await seedCategoryWithBehavior(
      categoryName,
      E2E_NEW_RESERVABLE_CATEGORY
    );
    const configurePage = createCategoryConfigurePage(page);

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );

      await expect(
        configurePage.getNextStepsProgress(
          PROGRESS(
            E2E_DURATION_STEP_DONE_COUNT,
            E2E_RESERVABLE_REQUIRED_STEPS
          )
        )
      ).toBeVisible();
      await expect(
        configurePage.getNextStepButton(DEPOSIT)
      ).toBeVisible();

      await configurePage.getNextStepButton(PHOTO).click();
      await expect(
        configurePage.getSectionButton(SECTION_PHOTO)
      ).toHaveAttribute("aria-expanded", STRING.TRUE);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });

  test("the progress grows after stock and a photo are added and the block disappears when all is done", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "next-steps-progress"
      );
    await seedCategoryWithBehavior(
      categoryName,
      E2E_NEW_RESERVABLE_CATEGORY
    );
    const configurePage = createCategoryConfigurePage(page);

    try {
      await logInAsAdmin(page);
      await configurePage.goTo(
        await findCategoryId(categoryName)
      );

      await setCategoryStockQuantity(
        categoryName,
        E2E_STOCK_QUANTITY
      );
      await page.reload();
      await expect(
        configurePage.getNextStepsProgress(
          PROGRESS(
            E2E_STOCK_STEP_DONE_COUNT,
            E2E_RESERVABLE_REQUIRED_STEPS
          )
        )
      ).toBeVisible();
      await expect(
        configurePage.getNextStepButton(STOCK)
      ).toHaveCount(LENGTH.ZERO);

      await addCategoryImage(categoryName);
      await page.reload();
      await expect(
        configurePage.getHeading(categoryName)
      ).toBeVisible();
      await expect(
        configurePage.getNextStepsHeading()
      ).toHaveCount(LENGTH.ZERO);
    } finally {
      await removeCategoryImage(categoryName);
      await removeCategoryWithStock(categoryName);
    }
  });

  test("a category that is not reservable lists only the stock step", async ({
    page,
  }, testInfo) => {
    const categoryName =
      resolveCategoryConfigureFixtureName(
        testInfo.project.name,
        "next-steps-internal"
      );

    try {
      const configurePage =
        await openCategoryConfigureScreen(
          page,
          categoryName
        );

      await expect(
        configurePage.getNextStepsProgress(
          PROGRESS(
            E2E_NO_STEPS_DONE,
            E2E_INTERNAL_REQUIRED_STEPS
          )
        )
      ).toBeVisible();
      await expect(
        configurePage.getNextStepButton(STOCK)
      ).toBeVisible();
      await expect(
        configurePage.getNextStepButton(PHOTO)
      ).toHaveCount(LENGTH.ZERO);
    } finally {
      await removeDeletableCategory(categoryName);
    }
  });
});

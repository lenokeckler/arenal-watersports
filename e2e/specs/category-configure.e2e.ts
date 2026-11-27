import { expect, test } from "@playwright/test";
import { LENGTH, PATHS, STRING } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureCopy.constants";
import { formatCategoryDurationLabel } from "@/app/features/administration/category-catalog/utils/formatCategoryDurationLabel";
import { createCategoryBehaviorFormPage } from "../pages/CategoryBehaviorForm.page";
import { createCategoryConfigurePage } from "../pages/CategoryConfigure.page";
import { logInAsAdmin } from "../support/logInAsAdmin";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "../support/categoryFixtures";
import {
  E2E_PICKED_DURATION_MINUTES,
  resolveCategoryConfigureFixtureName,
} from "../constants/E2eCategoryConfigure.constants";

const E2E_SECTION_COUNT = 6;

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

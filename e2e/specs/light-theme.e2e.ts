import { expect, test } from "@playwright/test";
import { PATHS, THEME } from "@/app/constants";
import { E2E_LIGHT_THEME_STORAGE } from "../constants/E2eLightTheme.constants";
import { createLightThemePage } from "../pages/LightTheme.page";
import { createHomePage } from "../pages/Home.page";
import { assertLightThemeContrastTargets } from "../support/assertLightThemeContrastTargets";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Light theme", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    await expect(page).toHaveURL(PATHS.BOARD);

    const homePage = createHomePage(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();

    const themePage = createLightThemePage(page);
    await expect(
      themePage.getToggleButton(THEME.DARK)
    ).toBeVisible();
  });

  test("switches themes, restores the device choice, and meets contrast targets", async ({
    page,
  }) => {
    const themePage = createLightThemePage(page);

    await themePage.clickToggleForTheme(THEME.LIGHT);
    await expect(themePage.getRoot()).toHaveAttribute(
      E2E_LIGHT_THEME_STORAGE.ATTRIBUTE,
      THEME.LIGHT
    );
    const storedLightTheme =
      await themePage.readStoredTheme();
    expect(storedLightTheme).toBe(THEME.LIGHT);

    assertLightThemeContrastTargets(
      await themePage.readColorTokens()
    );

    await page.reload();
    await expect(themePage.getRoot()).toHaveAttribute(
      E2E_LIGHT_THEME_STORAGE.ATTRIBUTE,
      THEME.LIGHT
    );
    await expect(
      themePage.getToggleButton(THEME.LIGHT)
    ).toBeVisible();

    await themePage.clickToggleForTheme(THEME.DARK);
    await expect(themePage.getRoot()).not.toHaveAttribute(
      E2E_LIGHT_THEME_STORAGE.ATTRIBUTE,
      THEME.LIGHT
    );
    expect(await themePage.readStoredTheme()).toBe(
      THEME.DARK
    );
  });
});

import { PATHS } from "@/app/constants";
import { E2E_NAVIGATION_LABELS } from "../constants/E2eNavigationLabels.constants";
import { createSystemNavigationPage } from "../pages/SystemNavigation.page";
import { expect, test } from "../support/dispatchSheetTest";
import { readNarrowestLabelGap } from "../support/readNarrowestLabelGap";

test.describe("System navigation labels", () => {
  test("keeps the administration labels apart on a narrow phone", async ({
    administratorPage: page,
  }) => {
    const navigation = createSystemNavigationPage(page);

    for (const viewport of E2E_NAVIGATION_LABELS.NARROW_VIEWPORTS) {
      await page.setViewportSize(viewport);
      await page.goto(PATHS.ADMINISTRATION.CATEGORIES);
      await expect(
        navigation.getNavigation()
      ).toBeVisible();

      expect(
        await readNarrowestLabelGap(
          navigation.getNavigation()
        )
      ).toBeGreaterThanOrEqual(
        E2E_NAVIGATION_LABELS.MINIMUM_GAP_PX
      );
    }
  });

  test("never lets two labels touch on a narrow phone", async ({
    boardDispatchSheet: dispatchSheet,
    signedInPage: page,
  }) => {
    const navigation = createSystemNavigationPage(page);
    expect(dispatchSheet.unitCodes.length).toBeGreaterThan(
      0
    );

    for (const viewport of E2E_NAVIGATION_LABELS.NARROW_VIEWPORTS) {
      await page.setViewportSize(viewport);
      await navigation.goTo();
      await expect(
        navigation.getNavigation()
      ).toBeVisible();

      expect(
        await readNarrowestLabelGap(
          navigation.getNavigation()
        )
      ).toBeGreaterThanOrEqual(
        E2E_NAVIGATION_LABELS.MINIMUM_GAP_PX
      );
    }
  });
});

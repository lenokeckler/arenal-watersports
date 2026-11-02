import { expect, test } from "@playwright/test";
import { E2E_SYSTEM_FRAME_TOLERANCE_PX } from "../constants/E2eSystemFrame.constants";
import { createSystemFramePage } from "../pages/SystemFrame.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("System frame", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("keeps the home page inside one viewport height", async ({
    page,
  }) => {
    const framePage = createSystemFramePage(page);

    await framePage.goToHome();

    const { documentHeight, viewportHeight } =
      await framePage.readScrollMetrics();
    expect(documentHeight).toBeLessThanOrEqual(
      viewportHeight + E2E_SYSTEM_FRAME_TOLERANCE_PX.SCROLL
    );
  });

  test("keeps the profile hub inside one viewport height", async ({
    page,
  }) => {
    const framePage = createSystemFramePage(page);

    await framePage.goToProfile();
    await expect(framePage.getProfileCard()).toBeVisible();

    const { documentHeight, viewportHeight } =
      await framePage.readScrollMetrics();
    expect(documentHeight).toBeLessThanOrEqual(
      viewportHeight + E2E_SYSTEM_FRAME_TOLERANCE_PX.SCROLL
    );
  });

  test("centres the profile card horizontally", async ({
    page,
  }) => {
    const framePage = createSystemFramePage(page);

    await framePage.goToProfile();
    await expect(framePage.getProfileCard()).toBeVisible();

    expect(
      await framePage.readProfileCardCentreOffset()
    ).toBeLessThanOrEqual(
      E2E_SYSTEM_FRAME_TOLERANCE_PX.CENTRE
    );
  });
});

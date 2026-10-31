import { expect, test } from "@playwright/test";
import {
  E2E_ONE_HANDED_USE_MINIMUM_ACTION_GAP,
  E2E_ONE_HANDED_USE_MINIMUM_DURATION_GAP,
  E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX,
} from "../constants/E2eOneHandedUse.constants";
import { E2E_RESERVATION_FORM_MOBILE_VIEWPORT } from "../constants/E2eReservationForm.constants";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import { createOneHandedUsePage } from "../pages/OneHandedUse.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.beforeEach(async ({ page }, testInfo) => {
  await signInAsSeededWorker(page);

  if (testInfo.project.name === E2E_PROJECT.MOBILE) {
    await page.setViewportSize({
      width: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.WIDTH,
      height: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.HEIGHT,
    });
  }
});

test("provides spaced controls with minimum touch targets", async ({
  page,
}) => {
  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();

  await expect(oneHandedUsePage.getActionBar()).toHaveCSS(
    "gap",
    E2E_ONE_HANDED_USE_MINIMUM_ACTION_GAP
  );
  await expect(
    oneHandedUsePage.getDurationButtonGroup()
  ).toHaveCSS(
    "gap",
    E2E_ONE_HANDED_USE_MINIMUM_DURATION_GAP
  );

  const buttonDimensions = await oneHandedUsePage
    .getMainButtons()
    .evaluateAll((buttons) =>
      buttons.map((button) => {
        const { height, width } =
          button.getBoundingClientRect();

        return { height, width };
      })
    );

  expect(
    buttonDimensions.every(
      ({ height, width }) =>
        height >=
          E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX &&
        width >= E2E_ONE_HANDED_USE_MINIMUM_TARGET_SIZE_PX
    )
  ).toBe(true);
});

test("keeps reservation actions visible without mobile overflow", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== E2E_PROJECT.MOBILE);

  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      window.innerWidth
  );

  expect(hasHorizontalOverflow).toBe(false);
  await expect(
    oneHandedUsePage.getSubmitButton()
  ).toBeVisible();
  await expect(oneHandedUsePage.getActionBar()).toHaveCSS(
    "position",
    "sticky"
  );
});

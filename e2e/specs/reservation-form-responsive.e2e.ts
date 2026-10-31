import { expect, test } from "@playwright/test";
import { E2E_RESERVATION_FORM_MOBILE_VIEWPORT } from "../constants/E2eReservationForm.constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation form responsive layout", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    await page.setViewportSize({
      width: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.WIDTH,
      height: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.HEIGHT,
    });
  });

  test("keeps the form readable and submit reachable", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await expect(
      reservationFormPage.getUnitSelect()
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);
    await expect(
      reservationFormPage.getBackButton()
    ).toBeVisible();
    await expect(
      reservationFormPage.getSubmitButton()
    ).toBeVisible();
    await expect(
      reservationFormPage.getSubmitActionBar()
    ).toHaveCSS("position", "sticky");
  });
});

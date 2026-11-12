import { expect, test } from "@playwright/test";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import {
  E2E_CUSTOM_COMBO,
  E2E_CUSTOM_COMBO_FIXTURE,
} from "../constants/E2eCustomCombo.constants";
import { E2E_RESERVATION_DURATION_PRESET } from "../constants/E2eReservationForm.constants";
import { createCustomComboReservationPage } from "../pages/CustomComboReservation.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Custom combo reservation form", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    await createCustomComboReservationPage(page).goTo();
  });

  test("preserves rental and tour category behavior", async ({
    page,
  }) => {
    const reservationPage =
      createCustomComboReservationPage(page);

    await expect(
      reservationPage.hasHorizontalOverflow()
    ).resolves.toBe(false);

    await expect(
      reservationPage.getReservationTypeRadio(
        RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
      )
    ).toBeChecked();
    await expect(
      reservationPage.getCategoryOption(
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
      )
    ).toHaveCount(0);
    await expect(
      reservationPage.getCategoryOption(
        E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
      )
    ).toHaveCount(1);

    await reservationPage.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );

    await expect(
      reservationPage.getCategoryOption(
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
      )
    ).toHaveCount(1);
    await expect(
      reservationPage.getGuideAssignmentField()
    ).toBeVisible();
    await expect(
      reservationPage.getEquipmentSelectionRegion()
    ).toHaveCount(0);
  });

  test("selects multiple categories with optional guide and separate quotes", async ({
    page,
  }) => {
    const reservationPage =
      createCustomComboReservationPage(page);

    await reservationPage.selectCombo();
    await expect(
      reservationPage.getNoGuideStatus()
    ).toBeVisible();
    await reservationPage.addCategory(
      E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
    );
    await reservationPage.increaseCategory(
      E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
    );
    await expect(
      reservationPage.getCategoryQuantityGroup(
        E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
      )
    ).toContainText(E2E_CUSTOM_COMBO.QUANTITY.INCREMENTED);

    let pricing = reservationPage.getPricingRegion();
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.SINGLE_CATEGORY_CRC
    );
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.SINGLE_CATEGORY_USD
    );

    await reservationPage.addCategory(
      E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
    );
    await expect(
      reservationPage.getGuideAssignmentField()
    ).toBeVisible();
    await expect(
      reservationPage.getGuideCheckbox(
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_NAME
      )
    ).toHaveJSProperty("required", false);
    await expect(
      reservationPage.getGuideCheckbox(
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_NAME
      )
    ).not.toBeChecked();
    await reservationPage.selectGuide(
      E2E_CUSTOM_COMBO_FIXTURE.GUIDE_NAME
    );
    await expect(
      reservationPage.getGuideCheckbox(
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_NAME
      )
    ).toBeChecked();

    pricing = reservationPage.getPricingRegion();
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.COMBINED_CRC
    );
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.COMBINED_USD
    );
    await reservationPage.fillAgreedAmount(
      E2E_CUSTOM_COMBO.COPY.CRC_AMOUNT,
      E2E_CUSTOM_COMBO.AGREED_AMOUNT.CRC
    );
    await reservationPage.fillAgreedAmount(
      E2E_CUSTOM_COMBO.COPY.USD_AMOUNT,
      E2E_CUSTOM_COMBO.AGREED_AMOUNT.USD
    );
    await expect(
      reservationPage.getAgreedAmountInput(
        E2E_CUSTOM_COMBO.COPY.CRC_AMOUNT
      )
    ).toHaveValue(E2E_CUSTOM_COMBO.AGREED_AMOUNT.CRC);
    await expect(
      reservationPage.getAgreedAmountInput(
        E2E_CUSTOM_COMBO.COPY.USD_AMOUNT
      )
    ).toHaveValue(E2E_CUSTOM_COMBO.AGREED_AMOUNT.USD);

    await reservationPage.selectDuration(
      E2E_RESERVATION_DURATION_PRESET.LABEL
    );
    pricing = reservationPage.getPricingRegion();
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.DURATION_CRC
    );
    await expect(pricing).toContainText(
      E2E_CUSTOM_COMBO.QUOTE.DURATION_USD
    );

    await reservationPage.decreaseCategory(
      E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
    );
    await expect(
      reservationPage.getNoGuideStatus()
    ).toBeVisible();
    await expect(
      reservationPage.getGuideAssignmentField()
    ).toHaveCount(0);
  });
});

import { describe, expect, it } from "vitest";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { createReservationFormNegativeInputPage } from "./ReservationFormNegativeInput.page";

describe("ReservationFormView negative numeric input", () => {
  it("preserves the prior positive people count after a negative attempt", async () => {
    renderReservationForm();
    const page = createReservationFormNegativeInputPage();

    await page.enterPeopleCount(
      RESERVATION_FORM_VIEW_TEST.VALID_PEOPLE_COUNT
    );
    page.attemptNegativePeopleCount();

    expect(page.getPeopleCountInput()).toHaveValue(
      Number(RESERVATION_FORM_VIEW_TEST.VALID_PEOPLE_COUNT)
    );
  });

  it("preserves the prior positive equipment quantity after a negative attempt", async () => {
    renderReservationForm();
    const page = createReservationFormNegativeInputPage();

    await page.enterEquipmentQuantity(
      RESERVATION_FORM_VIEW_TEST.VALID_EQUIPMENT_QUANTITY
    );
    page.attemptNegativeEquipmentQuantity();

    expect(page.getEquipmentQuantityInput()).toHaveValue(
      Number(
        RESERVATION_FORM_VIEW_TEST.VALID_EQUIPMENT_QUANTITY
      )
    );
  });

  it("keeps a blank custom duration blank after a negative attempt", async () => {
    renderReservationForm();
    const page = createReservationFormNegativeInputPage();

    await page.selectCustomDuration();
    page.attemptNegativeCustomDuration();

    expect(page.getCustomDurationInput()).toHaveProperty(
      "value",
      ""
    );
  });

  it("preserves a positive custom duration after a negative attempt", async () => {
    renderReservationForm();
    const page = createReservationFormNegativeInputPage();

    await page.selectCustomDuration();
    await page.enterCustomDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS
    );
    page.attemptNegativeCustomDuration();

    expect(page.getCustomDurationInput()).toHaveValue(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS_VALUE
    );
  });
});

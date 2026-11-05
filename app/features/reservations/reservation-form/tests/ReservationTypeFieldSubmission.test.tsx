import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock(
  "../actions/createCustomComboReservationAction",
  () => ({
    createCustomComboReservationAction: vi.fn(),
  })
);

describe("ReservationTypeField submission", () => {
  it("requires combo components before either reservation action", async () => {
    const page = renderReservationForm();

    await page.fillCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.CATEGORY_ID
    );
    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );
    await page.submit();

    expect(createReservationAction).not.toHaveBeenCalled();
    expect(
      createCustomComboReservationAction
    ).not.toHaveBeenCalled();
  });
});

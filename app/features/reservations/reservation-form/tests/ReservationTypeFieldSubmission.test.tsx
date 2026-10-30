import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("ReservationTypeField submission", () => {
  it("persists the selected reservation type", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
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

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        reservationType: RESERVATION_TYPE.COMBO,
      })
    );
  });
});

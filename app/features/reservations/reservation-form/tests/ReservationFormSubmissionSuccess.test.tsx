import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("reservation form successful submissions", () => {
  it("resets values after a successful reservation", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();
    await page.setCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    await page.setQuantity(
      RESERVATION_FORM_VIEW_TEST.VALID_EQUIPMENT_QUANTITY
    );
    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME
    );

    await page.submit();
    expect(
      await page.findSuccessMessage()
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(page.getSubmitButton()).toBeEnabled()
    );

    expect(createReservationAction).toHaveBeenCalledTimes(
      1
    );
    expect(page.getCustomerNameInput()).toHaveValue("");
    expect(page.queryQuantityInput()).toHaveValue(1);
    expect(
      page.getCategoryChoice(
        RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME
      )
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("submits custom duration as a number", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    await page.typeCustomDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        durationHours:
          RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_HOURS_VALUE,
      })
    );
  });
});

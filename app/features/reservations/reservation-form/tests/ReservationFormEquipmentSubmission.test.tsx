import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("reservation equipment submission", () => {
  it("keeps quantity when changing category and submits both values", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();

    await page.setQuantity(
      RESERVATION_FORM_VIEW_TEST.VALID_EQUIPMENT_QUANTITY
    );
    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_NAME
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId:
          RESERVATION_FORM_VIEW_TEST.ALTERNATE_CATEGORY_ID,
        quantity: Number(
          RESERVATION_FORM_VIEW_TEST.VALID_EQUIPMENT_QUANTITY
        ),
      })
    );
  });

  it("associates a category validation error with its radio group", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.CATEGORY_ID]:
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.CATEGORY_ID
          ],
      },
    });
    const page = renderReservationForm();

    await page.submit();

    const error = await page.findCategoryError();
    const categoryGroup = page.getCategoryGroup();
    expect(categoryGroup).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    expect(categoryGroup).toHaveAttribute(
      "aria-describedby",
      error.id
    );
  });
});

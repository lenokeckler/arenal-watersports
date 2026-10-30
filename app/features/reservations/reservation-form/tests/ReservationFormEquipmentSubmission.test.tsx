import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { STRING } from "@/app/constants";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

describe("reservation equipment submission", () => {
  it("clears an unavailable unit, reports the error, and reloads options", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue({
      availableQuantity: null,
      availableUnits: [
        {
          id: RESERVATION_FORM_VIEW_TEST.AVAILABLE_UNIT_ID,
          code: RESERVATION_FORM_VIEW_TEST.AVAILABLE_UNIT_CODE,
        },
      ],
    });
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.UNIT_ID]:
          RESERVATION_FORM_UI_COPY.UNIT_UNAVAILABLE,
      },
      unitUnavailable: true,
    });
    const page = renderReservationForm(true, true);

    await page.selectCategoryChoice(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );
    expect(page.getCategorySelect()).toHaveValue(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );
    expect(page.getSubmitButton()).toBeDisabled();
    expect(page.getUnitSelect()).toBeInTheDocument();
    const unitSelect = await page.findUnitSelect();
    await page.findAvailableUnit(
      RESERVATION_FORM_VIEW_TEST.AVAILABLE_UNIT_CODE
    );
    await page.selectUnit(
      RESERVATION_FORM_VIEW_TEST.AVAILABLE_UNIT_ID
    );
    await page.submit();

    expect(
      await page.findUnitUnavailableError()
    ).toBeInTheDocument();
    expect(unitSelect).toHaveValue(STRING.Empty);
    await waitFor(() =>
      expect(
        getAvailableReservationUnitsAction
      ).toHaveBeenCalledTimes(2)
    );
  });

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

  it("associates a category validation error with its category group", async () => {
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
    expect(categoryGroup).not.toHaveAttribute(
      "aria-invalid"
    );
    expect(categoryGroup).toHaveAttribute(
      "aria-describedby",
      error.id
    );
  });
});

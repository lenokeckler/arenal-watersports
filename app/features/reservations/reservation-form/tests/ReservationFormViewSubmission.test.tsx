import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("ReservationFormView submission", () => {
  it("submits the custom duration as a number", async () => {
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

  it("submits blank custom duration as zero and displays validation", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.DURATION_HOURS]:
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.DURATION_HOURS
          ],
      },
    });
    const page = renderReservationForm();

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.CUSTOM_DURATION_OPTION
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        durationHours:
          RESERVATION_FORM_VIEW_TEST.INVALID_CUSTOM_DURATION_HOURS,
      })
    );
    expect(
      await page.findDurationValidationError()
    ).toBeInTheDocument();
  });
});

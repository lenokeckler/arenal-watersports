import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_TYPE_COPY } from "../constants/ReservationTypeCopy.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

vi.mock(
  "../actions/getAvailableReservationUnitsAction",
  () => ({
    getAvailableReservationUnitsAction: vi.fn(),
  })
);

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

  it("shows a generic message when the server action rejects", async () => {
    vi.mocked(createReservationAction).mockRejectedValue(
      new Error(
        RESERVATION_FORM_VIEW_TEST.SERVER_ACTION_FAILURE_MESSAGE
      )
    );
    const page = renderReservationForm();

    await page.submit();

    const submissionError =
      await page.findSubmissionError();

    expect(submissionError).toBeInTheDocument();
    expect(submissionError).toHaveTextContent(
      RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
    );
    expect(submissionError).not.toHaveTextContent(
      RESERVATION_FORM_VIEW_TEST.SERVER_ACTION_FAILURE_MESSAGE
    );
  });

  it("requires and submits a concrete unit for Lancha", async () => {
    vi.mocked(
      getAvailableReservationUnitsAction
    ).mockResolvedValue([
      {
        code: RESERVATION_FORM_VIEW_TEST.UNIT_CODE,
        id: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
      },
    ]);
    vi.mocked(createReservationAction).mockClear();
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();

    await page.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await page.selectCategory(
      RESERVATION_FORM_VIEW_TEST.UNIT_CATEGORY_ID
    );
    await page.findUnitOption();
    expect(page.getQuantityInput()).not.toBeInTheDocument();
    await page.submit();

    expect(
      await page.findUnitValidationError()
    ).toBeInTheDocument();
    expect(createReservationAction).not.toHaveBeenCalled();

    await page.selectUnit(
      RESERVATION_FORM_VIEW_TEST.UNIT_ID
    );
    await page.submit();

    expect(createReservationAction).toHaveBeenCalledWith(
      expect.objectContaining({
        unitId: RESERVATION_FORM_VIEW_TEST.UNIT_ID,
      })
    );
  });
});

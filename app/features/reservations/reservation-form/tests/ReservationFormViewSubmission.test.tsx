import { describe, expect, it, vi } from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("ReservationFormView submission", () => {
  it("prevents another submission after a successful reservation", async () => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const page = renderReservationForm();

    await page.submit();
    expect(
      await page.findSuccessMessage()
    ).toBeInTheDocument();

    const submitButton = page.querySubmitButton();
    if (submitButton !== null) {
      expect(submitButton).toBeDisabled();
      await page.submit();
    } else {
      expect(submitButton).not.toBeInTheDocument();
    }

    expect(createReservationAction).toHaveBeenCalledTimes(
      1
    );
  });

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
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.DURATION_GROUP
    );
  });

  it("focuses the duration group when a preset has a server error", async () => {
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

    await page.submit();

    expect(
      await page.findDurationValidationError()
    ).toBeInTheDocument();
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.DURATION_GROUP
    );
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
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.SUBMISSION_ERROR
    );
  });

  it("clears stale field errors when the server action rejects", async () => {
    vi.mocked(createReservationAction)
      .mockResolvedValueOnce({
        ok: false,
        errors: {
          [RESERVATION_FORM_FIELD.CATEGORY_ID]:
            RESERVATION_FORM_COPY[
              RESERVATION_FORM_FIELD.CATEGORY_ID
            ],
        },
      })
      .mockRejectedValueOnce(
        new Error(
          RESERVATION_FORM_VIEW_TEST.SERVER_ACTION_FAILURE_MESSAGE
        )
      );
    const page = renderReservationForm();

    await page.submit();
    expect(
      await page.findCategoryError()
    ).toBeInTheDocument();
    await page.submit();

    expect(
      await page.findSubmissionError()
    ).toBeInTheDocument();
    expect(
      page.queryCategoryError()
    ).not.toBeInTheDocument();
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.SUBMISSION_ERROR
    );
  });
});

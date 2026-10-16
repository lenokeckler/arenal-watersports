import { render, screen } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import ReservationFormView from "../ReservationFormView";
import {
  RESERVATION_FORM_VIEW_FIXTURE,
  RESERVATION_FORM_TEST_COPY,
} from "./ReservationFormView.constants";
import { createReservationFormViewPage } from "./ReservationFormView.page";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

describe("ReservationFormView", () => {
  beforeEach(() => {
    vi.mocked(createReservationAction).mockResolvedValue({
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.CUSTOMER_NAME]:
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.CUSTOMER_NAME
          ],
      },
    });
  });

  it("selects a duration preset", async () => {
    render(
      <ReservationFormView
        {...RESERVATION_FORM_VIEW_FIXTURE}
      />
    );
    const reservationFormPage =
      createReservationFormViewPage();

    await reservationFormPage.selectDurationPreset();

    expect(
      reservationFormPage.getDurationPreset()
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      reservationFormPage.getDurationInput()
    ).toHaveValue(
      RESERVATION_FORM_TEST_COPY.PRESET_90_MINUTES_VALUE
    );
  });

  it("shows the server validation error after submit", async () => {
    render(
      <ReservationFormView
        {...RESERVATION_FORM_VIEW_FIXTURE}
      />
    );
    const reservationFormPage =
      createReservationFormViewPage();

    await reservationFormPage.submit();

    expect(
      await reservationFormPage.getValidationError()
    ).toBeVisible();
  });

  it("requires an explicit equipment category selection", () => {
    render(
      <ReservationFormView
        {...RESERVATION_FORM_VIEW_FIXTURE}
      />
    );

    expect(
      screen.getByLabelText(
        RESERVATION_FORM_TEST_COPY.CATEGORY_LABEL
      )
    ).toHaveValue("");
  });

  it("shows generic copy when reservation creation fails", async () => {
    vi.mocked(createReservationAction).mockRejectedValue(
      new Error("Database failure details")
    );
    render(
      <ReservationFormView
        {...RESERVATION_FORM_VIEW_FIXTURE}
      />
    );
    const reservationFormPage =
      createReservationFormViewPage();

    await reservationFormPage.submit();

    expect(
      await screen.findByText(
        RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
      )
    ).toBeVisible();
    expect(
      screen.queryByText("Database failure details")
    ).not.toBeInTheDocument();
  });
});

import { waitFor } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createReservationAction } from "../actions/createReservationAction";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { renderReservationForm } from "./ReservationFormView.fixture";

vi.mock("../actions/createReservationAction", () => ({
  createReservationAction: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("reservation form error focus", () => {
  it("focuses one validation error per submit attempt", async () => {
    vi.mocked(createReservationAction)
      .mockResolvedValueOnce({
        ok: false,
        errors: {
          [RESERVATION_FORM_FIELD.CUSTOMER_NAME]:
            RESERVATION_FORM_COPY[
              RESERVATION_FORM_FIELD.CUSTOMER_NAME
            ],
          [RESERVATION_FORM_FIELD.PEOPLE_COUNT]:
            RESERVATION_FORM_COPY[
              RESERVATION_FORM_FIELD.PEOPLE_COUNT
            ],
        },
      })
      .mockResolvedValueOnce({
        ok: false,
        errors: {
          [RESERVATION_FORM_FIELD.PEOPLE_COUNT]:
            RESERVATION_FORM_COPY[
              RESERVATION_FORM_FIELD.PEOPLE_COUNT
            ],
        },
      });
    const page = renderReservationForm();

    await page.submit();
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME
    );
    await page.setCustomerName(
      RESERVATION_FORM_VIEW_TEST.CUSTOMER_NAME
    );
    expect(page.getFocusedElement()).toHaveAttribute(
      "id",
      RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME
    );
    await page.submit();

    await waitFor(() =>
      expect(page.getFocusedElement()).toHaveAttribute(
        "id",
        RESERVATION_FORM_FIELD_ID.PEOPLE_COUNT
      )
    );
  });
});

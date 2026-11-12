import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { useReservationFormSubmission } from "../hooks/useReservationFormSubmission";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboReservationInput } from "../models/CustomComboReservationInput.interface";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";

vi.mock(
  "../actions/createCustomComboReservationAction",
  () => ({
    createCustomComboReservationAction: vi.fn(),
  })
);

const createInput = (): CustomComboReservationInput => ({
  ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT,
  guideIds: [
    ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT
      .guideIds,
  ],
  items:
    RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT.items.map(
      (item) => ({ ...item })
    ),
});

describe("custom combo submission", () => {
  beforeEach(() => vi.clearAllMocks());

  it("marks the form submitted after a successful combo action", async () => {
    vi.mocked(
      createCustomComboReservationAction
    ).mockResolvedValue({
      ok: true,
      reservationId:
        RESERVATION_FORM_VIEW_TEST.CREATED_RESERVATION_ID,
    });
    const { result } = renderHook(() =>
      useReservationFormSubmission()
    );
    const input = createInput();

    act(() =>
      result.current.submitCustomComboReservation(input)
    );

    await waitFor(() =>
      expect(result.current.isSubmitted).toBe(true)
    );
    expect(
      createCustomComboReservationAction
    ).toHaveBeenCalledWith(input);
  });

  it("shows a recoverable form error when the combo action rejects", async () => {
    vi.mocked(
      createCustomComboReservationAction
    ).mockRejectedValue(new Error());
    const { result } = renderHook(() =>
      useReservationFormSubmission()
    );
    const input = createInput();

    act(() =>
      result.current.submitCustomComboReservation(input)
    );

    await waitFor(() =>
      expect(result.current.formError).toBe(
        RESERVATION_FORM_UI_COPY.SUBMIT_ERROR
      )
    );
    expect(result.current.isSubmitted).toBe(false);
  });

  it("exposes a server validation error on the matching combo field", async () => {
    const message =
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_USD;
    vi.mocked(
      createCustomComboReservationAction
    ).mockResolvedValue({
      ok: false,
      errors: {
        [CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD]:
          message,
      },
    });
    const { result } = renderHook(() =>
      useReservationFormSubmission()
    );
    const input = createInput();

    act(() =>
      result.current.submitCustomComboReservation(input)
    );

    await waitFor(() =>
      expect(
        result.current.errors[
          CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
        ]
      ).toBe(message)
    );
    expect(result.current.isSubmitted).toBe(false);
  });
});

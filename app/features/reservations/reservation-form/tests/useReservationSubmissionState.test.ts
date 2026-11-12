import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { useReservationSubmissionState } from "../hooks/useReservationSubmissionState";

describe("useReservationSubmissionState custom combo amount errors", () => {
  it("exposes and clears currency-specific server errors", () => {
    const { result } = renderHook(() =>
      useReservationSubmissionState()
    );
    const error =
      CUSTOM_COMBO_RESERVATION_COPY.INVALID_AGREED_AMOUNT_USD;

    act(() =>
      result.current.applyResult({
        errors: {
          [CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD]:
            error,
        },
        ok: false,
      })
    );

    expect(
      result.current.errors[
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
      ]
    ).toBe(error);

    act(() =>
      result.current.clearFieldError(
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
      )
    );

    expect(
      result.current.errors[
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
      ]
    ).toBeUndefined();
  });
});

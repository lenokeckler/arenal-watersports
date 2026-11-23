import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { useReservationChargeViewModel } from "../hooks/useReservationChargeViewModel";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import {
  BOTH_CHARGE,
  EDITED_METHOD_TEXT,
} from "./ReservationChargeForm.constants";
import { SECOND_AMOUNT_TEXT_CASES } from "./ReservationChargeSecondAmount.constants";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("useReservationChargeViewModel mixed mode", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts single with the other currency as second", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    expect(result.current.isMixed).toBe(false);
    expect(result.current.secondAmountText).toBeNull();
    expect(result.current.secondCurrency).toBe(
      CURRENCY_CODE.CRC
    );
  });

  it("follows the selected currency", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.secondCurrency).toBe(
      CURRENCY_CODE.USD
    );
  });

  it("enters and leaves mixed mode through the toggle", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() => result.current.toggleSecondAmount());
    expect(result.current.isMixed).toBe(true);
    expect(result.current.secondAmountText).toBe(
      STRING.Empty
    );

    act(() => result.current.toggleSecondAmount());
    expect(result.current.isMixed).toBe(false);
  });

  it("clears errors when the second amount is edited", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() => result.current.toggleSecondAmount());
    act(() =>
      result.current.setPaymentMethod(EDITED_METHOD_TEXT)
    );
    act(() => result.current.handleSubmit());
    expect(result.current.errors.secondAmount).toBe(
      VALIDATION.AMOUNT_REQUIRED
    );

    act(() =>
      result.current.setSecondAmountText(
        SECOND_AMOUNT_TEXT_CASES.VALID
      )
    );

    expect(result.current.errors).toEqual({});
  });

  it("ignores the toggle while pending", () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(
      new Promise<ReservationChargeActionResult>(
        () => undefined
      )
    );
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() =>
      result.current.setPaymentMethod(EDITED_METHOD_TEXT)
    );
    act(() => result.current.handleSubmit());
    act(() => result.current.toggleSecondAmount());

    expect(result.current.isPending).toBe(true);
    expect(result.current.isMixed).toBe(false);
  });
});

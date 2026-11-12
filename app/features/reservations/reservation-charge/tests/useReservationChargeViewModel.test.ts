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
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import {
  BOTH_CHARGE,
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

describe("useReservationChargeViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("composes the prefilled values with an idle submission", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    expect(result.current).toMatchObject({
      amountText: USD_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.USD,
      errors: {},
      formError: STRING.Empty,
      isPending: false,
      isSubmitDisabled: false,
      paymentMethod: STRING.Empty,
      recorded: null,
    });
  });

  it("swaps the proposal through setCurrency", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.amountText).toBe(
      CRC_PROPOSAL_TEXT
    );
  });

  it("clears errors when a field is edited", () => {
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );

    act(() => result.current.setAmountText(STRING.Empty));
    act(() => result.current.handleSubmit());
    expect(result.current.errors.amount).toBe(
      VALIDATION.AMOUNT_REQUIRED
    );

    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    expect(result.current.errors).toEqual({});
  });

  it("disables submit and ignores edits while pending", async () => {
    let resolveAction: (
      result: ReservationChargeActionResult
    ) => void = () => undefined;
    vi.mocked(
      recordReservationChargeAction
    ).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );
    act(() =>
      result.current.setPaymentMethod(EDITED_METHOD_TEXT)
    );

    act(() => result.current.handleSubmit());
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    expect(result.current.isPending).toBe(true);
    expect(result.current.isSubmitDisabled).toBe(true);
    expect(result.current.amountText).toBe(
      USD_PROPOSAL_TEXT
    );

    await act(() =>
      Promise.resolve(
        resolveAction({
          ok: true,
          recorded: CHARGE_RECORDED,
        })
      )
    );
  });

  it("stays disabled after the charge is recorded", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    const { result } = renderHook(() =>
      useReservationChargeViewModel(BOTH_CHARGE)
    );
    act(() =>
      result.current.setPaymentMethod(EDITED_METHOD_TEXT)
    );

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.recorded).toEqual(
      CHARGE_RECORDED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });
});

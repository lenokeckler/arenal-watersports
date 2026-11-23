import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { useReservationChargeViewModel } from "../hooks/useReservationChargeViewModel";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import { CHARGE_PAYMENT_METHOD } from "./ReservationChargeAction.constants";
import {
  BOTH_CHARGE,
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
} from "./ReservationChargeForm.constants";
import { MIXED_RECORDED } from "./ReservationChargeRecordedParts.constants";
import { SECOND_AMOUNT_TEXT_CASES } from "./ReservationChargeSecondAmount.constants";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const renderMixed = () => {
  const view = renderHook(() =>
    useReservationChargeViewModel(BOTH_CHARGE)
  );
  act(() => view.result.current.toggleSecondAmount());
  act(() =>
    view.result.current.setSecondAmountText(
      SECOND_AMOUNT_TEXT_CASES.VALID
    )
  );
  act(() =>
    view.result.current.setPaymentMethod(
      CHARGE_PAYMENT_METHOD
    )
  );
  return view;
};

const holdPending = (): void => {
  vi.mocked(recordReservationChargeAction).mockReturnValue(
    new Promise<ReservationChargeActionResult>(
      () => undefined
    )
  );
};

describe("useReservationChargeViewModel mixed flow", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("clears the second amount error when the toggle turns it off", () => {
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

    act(() => result.current.toggleSecondAmount());

    expect(result.current.errors).toEqual({});
  });

  it("keeps the second currency opposite to the first while mixed", () => {
    const { result } = renderMixed();

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.isMixed).toBe(true);
    expect(result.current.secondCurrency).toBe(
      CURRENCY_CODE.USD
    );
  });

  it("ignores every edit while pending", () => {
    holdPending();
    const { result } = renderMixed();
    act(() => result.current.handleSubmit());
    const before = { ...result.current };

    act(() => {
      result.current.setAmountText(EDITED_AMOUNT_TEXT);
      result.current.setSecondAmountText(
        SECOND_AMOUNT_TEXT_CASES.FORMAT
      );
      result.current.setPaymentMethod(EDITED_METHOD_TEXT);
      result.current.setCurrency(CURRENCY_CODE.CRC);
      result.current.toggleSecondAmount();
    });

    expect(result.current.isPending).toBe(true);
    expect(result.current.amountText).toBe(
      before.amountText
    );
    expect(result.current.secondAmountText).toBe(
      SECOND_AMOUNT_TEXT_CASES.VALID
    );
    expect(result.current.paymentMethod).toBe(
      CHARGE_PAYMENT_METHOD
    );
    expect(result.current.currency).toBe(before.currency);
  });

  it("sends the second amount text to the action", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: MIXED_RECORDED,
    });
    const { result } = renderMixed();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith({
      amountText: result.current.amountText,
      currency: result.current.currency,
      paymentMethod: CHARGE_PAYMENT_METHOD,
      reservationId: CHARGE_RESERVATION_ID,
      secondAmountText: SECOND_AMOUNT_TEXT_CASES.VALID,
    });
  });

  it("keeps a recorded charge with two parts and locks the form", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: MIXED_RECORDED,
    });
    const { result } = renderMixed();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.recorded?.parts).toHaveLength(2);
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("does not call the action when the second amount is invalid", () => {
    const { result } = renderMixed();
    act(() =>
      result.current.setSecondAmountText(
        SECOND_AMOUNT_TEXT_CASES.FORMAT
      )
    );

    act(() => result.current.handleSubmit());

    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
    expect(result.current.errors.secondAmount).toBe(
      VALIDATION.AMOUNT.format
    );
  });
});

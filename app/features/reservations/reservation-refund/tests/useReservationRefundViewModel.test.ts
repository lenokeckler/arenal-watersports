import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { useReservationRefundViewModel } from "../hooks/useReservationRefundViewModel";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import {
  CRC_ONLY_AMOUNT_TEXT,
  BOTH_REFUND,
  EDITED_AMOUNT_TEXT,
  NETWORK_FAILURE,
} from "./ReservationRefundForm.constants";
import { AVAILABLE_CRC } from "./ReservationRefundValues.constants";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

const renderViewModel = () =>
  renderHook(() =>
    useReservationRefundViewModel(BOTH_REFUND)
  );

describe("useReservationRefundViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("composes empty values with an idle submission", () => {
    const { result } = renderViewModel();

    expect(result.current).toMatchObject({
      amountText: STRING.Empty,
      currency: CURRENCY_CODE.USD,
      errors: {},
      formError: STRING.Empty,
      isPending: false,
      isSubmitDisabled: false,
      otherReasonText: STRING.Empty,
      reason: null,
      recorded: null,
    });
  });

  it("exposes the available amount of the selected currency", () => {
    const { result } = renderViewModel();

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.available).toBe(AVAILABLE_CRC);
  });

  it("clears errors when a field is edited", () => {
    const { result } = renderViewModel();

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
      result: ReservationRefundActionResult
    ) => void = () => undefined;
    vi.mocked(
      recordReservationRefundAction
    ).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderViewModel();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.CANCELLED_TRIP
      )
    );

    act(() => result.current.handleSubmit());
    act(() => result.current.setAmountText(STRING.Empty));

    expect(result.current.isPending).toBe(true);
    expect(result.current.isSubmitDisabled).toBe(true);
    expect(result.current.amountText).toBe(
      EDITED_AMOUNT_TEXT
    );

    await act(() =>
      Promise.resolve(
        resolveAction({
          ok: true,
          recorded: REFUND_RECORDED,
        })
      )
    );
  });

  it("stays disabled after the refund is recorded", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const { result } = renderViewModel();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.CUT_SHORT_TRIP
      )
    );

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.recorded).toEqual(
      REFUND_RECORDED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("refuses a typed amount above the available of the new currency", async () => {
    const { result } = renderViewModel();
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );
    act(() =>
      result.current.setAmountText(CRC_ONLY_AMOUNT_TEXT)
    );
    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.CANCELLED_TRIP
      )
    );
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.USD)
    );

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.errors.amount).toBeDefined();
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("locks submit and keeps the alert after an unconfirmed failure", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const { result } = renderViewModel();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.CANCELLED_TRIP
      )
    );
    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.isSubmitDisabled).toBe(true);
    expect(result.current.formError).toBe(
      FEEDBACK.UNCONFIRMED
    );
    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledTimes(1);
  });
});

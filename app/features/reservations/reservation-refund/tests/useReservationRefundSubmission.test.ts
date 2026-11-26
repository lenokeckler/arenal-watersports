import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { ABOVE_USD_AMOUNT_TEXT } from "./ReservationRefundForm.constants";
import {
  AVAILABLE_USD,
  VALID_REFUND_INPUT,
  VALID_REFUND_VALUES,
} from "./ReservationRefundValues.constants";
import { renderSubmission } from "./renderReservationRefundSubmission";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

describe("useReservationRefundSubmission", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts idle", () => {
    const { result } = renderSubmission();

    expect(result.current).toMatchObject({
      errors: {},
      formError: STRING.Empty,
      isPending: false,
      recorded: null,
    });
  });

  it("shows the client errors without calling the action", () => {
    const { result } = renderSubmission({
      ...VALID_REFUND_VALUES,
      amountText: STRING.Empty,
      reason: null,
    });

    act(() => result.current.handleSubmit());

    expect(result.current.errors).toEqual({
      amount: VALIDATION.AMOUNT_REQUIRED,
      reason: VALIDATION.REASON_REQUIRED,
    });
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("refuses an amount above what is available right away", () => {
    const { result } = renderSubmission(
      {
        ...VALID_REFUND_VALUES,
        amountText: ABOVE_USD_AMOUNT_TEXT,
      },
      AVAILABLE_USD
    );

    act(() => result.current.handleSubmit());

    expect(result.current.errors.amount).toBeDefined();
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("sends the values with the reservation id and keeps the recorded refund", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue({
      ok: true,
      recorded: REFUND_RECORDED,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledWith(VALID_REFUND_INPUT);
    expect(result.current.recorded).toEqual(
      REFUND_RECORDED
    );
  });
  it("clears errors on request", () => {
    const { result } = renderSubmission({
      ...VALID_REFUND_VALUES,
      amountText: STRING.Empty,
    });

    act(() => result.current.handleSubmit());
    act(() => result.current.clearErrors());

    expect(result.current.errors).toEqual({});
    expect(result.current.formError).toBe(STRING.Empty);
  });
});

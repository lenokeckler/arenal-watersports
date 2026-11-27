import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as VALIDATION } from "../constants/ReservationDepositValidationCopy.constants";
import { useReservationDepositSubmission } from "../hooks/useReservationDepositSubmission";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";
import { RECEIVED_RECORDED } from "./ReservationDepositAction.constants";
import {
  RECEIVED_DEPOSIT_INPUT,
  RECEIVED_DEPOSIT_VALUES,
} from "./ReservationDepositValues.constants";

vi.mock(
  "../actions/recordReservationDepositAction",
  () => ({
    recordReservationDepositAction: vi.fn(),
  })
);

const renderSubmission = (
  values: ReservationDepositValues = RECEIVED_DEPOSIT_VALUES
) =>
  renderHook(() =>
    useReservationDepositSubmission(
      DEPOSIT_RESERVATION_ID,
      values
    )
  );

describe("useReservationDepositSubmission", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts idle", () => {
    const { result } = renderSubmission();

    expect(result.current).toMatchObject({
      errors: {},
      formError: STRING.Empty,
      isPending: false,
      mayBeRecorded: false,
      recorded: null,
    });
  });

  it("shows the amount error without calling the action", () => {
    const { result } = renderSubmission({
      ...RECEIVED_DEPOSIT_VALUES,
      amountText: STRING.Empty,
    });

    act(() => result.current.handleSubmit());

    expect(result.current.errors).toEqual({
      amount: VALIDATION.AMOUNT_REQUIRED,
    });
    expect(
      recordReservationDepositAction
    ).not.toHaveBeenCalled();
  });

  it("sends the no deposit answer even with an empty amount", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    const { result } = renderSubmission({
      ...RECEIVED_DEPOSIT_VALUES,
      amountText: STRING.Empty,
      hasDeposit: false,
    });

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationDepositAction
    ).toHaveBeenCalledOnce();
  });

  it("sends the values with the reservation id and keeps the recorded deposit", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationDepositAction
    ).toHaveBeenCalledWith(RECEIVED_DEPOSIT_INPUT);
    expect(result.current.recorded).toEqual(
      RECEIVED_RECORDED
    );
  });

  it("shows the refusal of the server", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: false,
      errors: {},
      formError: FEEDBACK.ALREADY_DECIDED,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.formError).toBe(
      FEEDBACK.ALREADY_DECIDED
    );
    expect(result.current.recorded).toBeNull();
  });

  it("clears errors on request", () => {
    const { result } = renderSubmission({
      ...RECEIVED_DEPOSIT_VALUES,
      amountText: STRING.Empty,
    });

    act(() => result.current.handleSubmit());
    act(() => result.current.clearErrors());

    expect(result.current.errors).toEqual({});
    expect(result.current.formError).toBe(STRING.Empty);
  });
});

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
import { useReservationDepositViewModel } from "../hooks/useReservationDepositViewModel";
import type { ReservationDepositActionResult } from "../models/ReservationDepositActionResult.type";
import { UNDECIDED_DEPOSIT } from "./ReservationDeposit.constants";
import {
  DEPOSIT_NETWORK_FAILURE,
  RECEIVED_RECORDED,
} from "./ReservationDepositAction.constants";
import {
  EDITED_AMOUNT_TEXT,
  RECEIVED_DEPOSIT_VALUES,
} from "./ReservationDepositValues.constants";

vi.mock(
  "../actions/recordReservationDepositAction",
  () => ({
    recordReservationDepositAction: vi.fn(),
  })
);

const renderViewModel = () =>
  renderHook(() =>
    useReservationDepositViewModel(UNDECIDED_DEPOSIT)
  );

describe("useReservationDepositViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("composes the proposed values with an idle submission", () => {
    const { result } = renderViewModel();

    expect(result.current).toMatchObject({
      ...RECEIVED_DEPOSIT_VALUES,
      errors: {},
      formError: STRING.Empty,
      isPending: false,
      isSubmitDisabled: false,
      proposal: UNDECIDED_DEPOSIT.proposal,
      recorded: null,
    });
  });

  it("clears errors when a field is edited", () => {
    const { result } = renderViewModel();
    act(() => result.current.setAmountText(STRING.Empty));

    act(() => result.current.handleSubmit());
    expect(result.current.errors.amount).toBe(
      VALIDATION.AMOUNT_REQUIRED
    );

    act(() => result.current.setHasDeposit(false));

    expect(result.current.errors).toEqual({});
  });

  it("disables submit and ignores edits while pending", async () => {
    let resolveAction: (
      result: ReservationDepositActionResult
    ) => void = () => undefined;
    vi.mocked(
      recordReservationDepositAction
    ).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderViewModel();

    act(() => result.current.handleSubmit());
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    expect(result.current.isPending).toBe(true);
    expect(result.current.isSubmitDisabled).toBe(true);
    expect(result.current.amountText).toBe(
      RECEIVED_DEPOSIT_VALUES.amountText
    );

    await act(() =>
      Promise.resolve(
        resolveAction({
          ok: true,
          recorded: RECEIVED_RECORDED,
        })
      )
    );
  });

  it("stays disabled after the deposit is recorded", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue({
      ok: true,
      recorded: RECEIVED_RECORDED,
    });
    const { result } = renderViewModel();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.recorded).toEqual(
      RECEIVED_RECORDED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("locks submit and keeps the alert after an unconfirmed failure", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockRejectedValue(DEPOSIT_NETWORK_FAILURE);
    const { result } = renderViewModel();
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
      recordReservationDepositAction
    ).toHaveBeenCalledTimes(1);
  });
});

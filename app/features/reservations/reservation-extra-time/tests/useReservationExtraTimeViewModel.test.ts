import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CURRENCY_CODE,
  PAYMENT_CHOICE,
} from "@/app/constants";
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_INITIAL_VALUES } from "../constants/ReservationExtraTimeDefaults.constants";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "../constants/ReservationExtraTimeValidationCopy.constants";
import type { ReservationExtraTimeActionResult } from "../models/ReservationExtraTimeActionResult.type";
import {
  EXTRA_TIME_AMOUNT_TEXT,
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_COURTESY_INPUT,
} from "./ReservationExtraTime.constants";
import { EXTRA_TIME_CHARGED_RECORDED } from "./ReservationExtraTimeData.constants";
import { renderViewModel } from "./renderReservationExtraTimeViewModel";

vi.mock(
  "../actions/recordReservationExtraTimeAction",
  () => ({
    recordReservationExtraTimeAction: vi.fn(),
  })
);

const fillCharge = (
  result: ReturnType<typeof renderViewModel>["result"]
): void => {
  act(() => result.current.setOutcome(OUTCOME.CHARGED));
  act(() =>
    result.current.setAmountText(EXTRA_TIME_AMOUNT_TEXT)
  );
  act(() =>
    result.current.setPaymentChoice(PAYMENT_CHOICE.CASH)
  );
};

describe("useReservationExtraTimeViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts undecided, in the first currency and without errors", () => {
    const { result } = renderViewModel();

    expect(result.current).toMatchObject({
      ...RESERVATION_EXTRA_TIME_INITIAL_VALUES,
      errors: {},
      isCharged: false,
      isPending: false,
      isSubmitDisabled: false,
      recorded: null,
    });
  });

  it("asks for the decision before sending anything", () => {
    const { result } = renderViewModel();

    act(() => result.current.handleSubmit());

    expect(result.current.errors).toEqual({
      outcome: VALIDATION.OUTCOME_REQUIRED,
    });
    expect(
      recordReservationExtraTimeAction
    ).not.toHaveBeenCalled();
  });

  it("clears the errors once the decision changes", () => {
    const { result } = renderViewModel();
    act(() => result.current.handleSubmit());

    act(() => result.current.setOutcome(OUTCOME.CHARGED));

    expect(result.current.errors).toEqual({});
    expect(result.current.isCharged).toBe(true);
  });

  it("asks for the amount and method of a charge", () => {
    const { result } = renderViewModel();
    act(() => result.current.setOutcome(OUTCOME.CHARGED));

    act(() => result.current.handleSubmit());

    expect(result.current.errors).toEqual({
      amount: VALIDATION.AMOUNT_REQUIRED,
      paymentChoice: VALIDATION.CHOICE_REQUIRED,
    });
  });

  it("sends a charge and keeps the recorded decision", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      ok: true,
      recorded: EXTRA_TIME_CHARGED_RECORDED,
    });
    const { result } = renderViewModel();
    fillCharge(result);

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationExtraTimeAction
    ).toHaveBeenCalledWith(EXTRA_TIME_CHARGED_INPUT);
    expect(result.current.recorded).toEqual(
      EXTRA_TIME_CHARGED_RECORDED
    );
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it("sends a courtesy with no amount", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      ok: true,
      recorded: {
        ...EXTRA_TIME_CHARGED_RECORDED,
        charge: null,
        outcome: OUTCOME.COURTESY,
      },
    });
    const { result } = renderViewModel();
    act(() => result.current.setOutcome(OUTCOME.COURTESY));

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationExtraTimeAction
    ).toHaveBeenCalledWith(EXTRA_TIME_COURTESY_INPUT);
  });

  it("keeps the currency picked for the charge", () => {
    const { result } = renderViewModel();

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.currency).toBe(CURRENCY_CODE.CRC);
  });

  it("shows the refusal of the server", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.ALREADY_RESOLVED,
      ok: false,
    });
    const { result } = renderViewModel();
    fillCharge(result);

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.formError).toBe(
      FEEDBACK.ALREADY_RESOLVED
    );
    expect(result.current.recorded).toBeNull();
  });

  it("ignores edits and a second submit while the answer is pending", async () => {
    let resolveAction: (
      value: ReservationExtraTimeActionResult
    ) => void = () => undefined;
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockReturnValue(
      new Promise((resolve) => {
        resolveAction = resolve;
      })
    );
    const { result } = renderViewModel();
    fillCharge(result);

    act(() => result.current.handleSubmit());
    act(() => result.current.setOutcome(OUTCOME.COURTESY));
    act(() => result.current.handleSubmit());

    expect(result.current.isPending).toBe(true);
    expect(result.current.outcome).toBe(OUTCOME.CHARGED);
    expect(
      recordReservationExtraTimeAction
    ).toHaveBeenCalledOnce();

    await act(async () => {
      resolveAction({
        ok: true,
        recorded: EXTRA_TIME_CHARGED_RECORDED,
      });
    });
    expect(result.current.isPending).toBe(false);
  });
});

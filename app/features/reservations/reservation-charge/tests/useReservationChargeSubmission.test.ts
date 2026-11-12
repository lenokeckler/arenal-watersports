import {
  act,
  renderHook,
  type RenderHookResult,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { useReservationChargeSubmission } from "../hooks/useReservationChargeSubmission";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import type { ReservationChargeSubmission } from "../models/ReservationChargeSubmission.interface";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";
import {
  CHARGE_RECORDED,
  CHARGE_UNEXPECTED_ERROR,
} from "./ReservationChargeAction.constants";
import { NETWORK_FAILURE } from "./ReservationChargeForm.constants";
import {
  VALID_CHARGE_INPUT,
  VALID_CHARGE_VALUES,
} from "./ReservationChargeValues.constants";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

const renderSubmission = (
  values: ReservationChargeValues = VALID_CHARGE_VALUES
): RenderHookResult<ReservationChargeSubmission, unknown> =>
  renderHook(() =>
    useReservationChargeSubmission(
      CHARGE_RESERVATION_ID,
      values
    )
  );

describe("useReservationChargeSubmission", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("blocks the action when the values are invalid", () => {
    const { result } = renderSubmission({
      ...VALID_CHARGE_VALUES,
      amountText: STRING.Empty,
    });

    act(() => result.current.handleSubmit());

    expect(
      recordReservationChargeAction
    ).not.toHaveBeenCalled();
    expect(result.current.errors.amount).toBe(
      VALIDATION.AMOUNT_REQUIRED
    );
  });

  it("sends the values and keeps the recorded charge", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledWith(VALID_CHARGE_INPUT);
    expect(result.current.recorded).toEqual(
      CHARGE_RECORDED
    );
  });

  it("shows the field errors the action returns", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: { paymentMethod: VALIDATION.METHOD_REQUIRED },
      ok: false,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.errors).toEqual({
      paymentMethod: VALIDATION.METHOD_REQUIRED,
    });
    expect(result.current.recorded).toBeNull();
  });

  it("shows the form error the action returns", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      errors: {},
      formError: FEEDBACK.STATUS_CHANGED,
      ok: false,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.formError).toBe(
      FEEDBACK.STATUS_CHANGED
    );
  });

  it.each([NETWORK_FAILURE, CHARGE_UNEXPECTED_ERROR])(
    "shows the offline message when the action throws",
    async (failure) => {
      vi.mocked(
        recordReservationChargeAction
      ).mockRejectedValue(failure);
      const { result } = renderSubmission();

      await act(() =>
        Promise.resolve(result.current.handleSubmit())
      );

      expect(result.current.formError).toBe(
        FEEDBACK.OFFLINE
      );
      expect(result.current.isPending).toBe(false);
    }
  );

  it("ignores a second submit while one is pending", async () => {
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
    const { result } = renderSubmission();

    act(() => result.current.handleSubmit());
    act(() => result.current.handleSubmit());

    expect(result.current.isPending).toBe(true);
    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledTimes(1);

    await act(() =>
      Promise.resolve(
        resolveAction({
          ok: true,
          recorded: CHARGE_RECORDED,
        })
      )
    );
  });

  it("does not submit again once the charge is recorded", async () => {
    vi.mocked(
      recordReservationChargeAction
    ).mockResolvedValue({
      ok: true,
      recorded: CHARGE_RECORDED,
    });
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );
    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationChargeAction
    ).toHaveBeenCalledTimes(1);
  });

  it("clears errors on request", () => {
    const { result } = renderSubmission({
      ...VALID_CHARGE_VALUES,
      amountText: STRING.Empty,
    });

    act(() => result.current.handleSubmit());
    act(() => result.current.clearErrors());

    expect(result.current.errors).toEqual({});
    expect(result.current.formError).toBe(STRING.Empty);
  });
});

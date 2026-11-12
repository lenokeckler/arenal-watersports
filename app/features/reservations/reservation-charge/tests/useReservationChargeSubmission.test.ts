import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STRING } from "@/app/constants";
import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import { CHARGE_RECORDED } from "./ReservationChargeAction.constants";
import {
  VALID_CHARGE_INPUT,
  VALID_CHARGE_VALUES,
} from "./ReservationChargeValues.constants";
import { renderSubmission } from "./renderReservationChargeSubmission";

vi.mock("../actions/recordReservationChargeAction", () => ({
  recordReservationChargeAction: vi.fn(),
}));

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

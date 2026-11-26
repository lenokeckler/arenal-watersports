import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { NETWORK_FAILURE } from "./ReservationRefundForm.constants";
import { renderSubmission } from "./renderReservationRefundSubmission";

vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

describe("useReservationRefundSubmission locking", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("ignores a second submit while one is pending", async () => {
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
    const { result } = renderSubmission();

    act(() => result.current.handleSubmit());
    act(() => result.current.handleSubmit());

    expect(result.current.isPending).toBe(true);
    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledTimes(1);

    await act(() =>
      Promise.resolve(
        resolveAction({
          ok: true,
          recorded: REFUND_RECORDED,
        })
      )
    );
  });

  it("does not submit again once the refund is recorded", async () => {
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
    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(
      recordReservationRefundAction
    ).toHaveBeenCalledTimes(1);
  });

  it("unlocks after the action rejects", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);
    const { result } = renderSubmission();

    await act(() =>
      Promise.resolve(result.current.handleSubmit())
    );

    expect(result.current.isPending).toBe(false);
  });
});

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import { submitReservationRefund } from "../utils/submitReservationRefund";
import { REFUND_RECORDED } from "./ReservationRefundAction.constants";
import { NETWORK_FAILURE } from "./ReservationRefundForm.constants";
import { VALID_REFUND_INPUT } from "./ReservationRefundValues.constants";

vi.mock("@/app/utils/network/isBrowserOffline", () => ({
  isBrowserOffline: vi.fn(),
}));
vi.mock("../actions/recordReservationRefundAction", () => ({
  recordReservationRefundAction: vi.fn(),
}));

describe("submitReservationRefund", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the action result when it answers", async () => {
    const result: ReservationRefundActionResult = {
      ok: true,
      recorded: REFUND_RECORDED,
    };
    vi.mocked(
      recordReservationRefundAction
    ).mockResolvedValue(result);

    await expect(
      submitReservationRefund(VALID_REFUND_INPUT)
    ).resolves.toEqual({ mayBeRecorded: false, result });
  });

  it("answers offline without calling the action", async () => {
    vi.mocked(isBrowserOffline).mockReturnValue(true);

    await expect(
      submitReservationRefund(VALID_REFUND_INPUT)
    ).resolves.toEqual({
      mayBeRecorded: false,
      result: {
        errors: {},
        formError: FEEDBACK.OFFLINE,
        ok: false,
      },
    });
    expect(
      recordReservationRefundAction
    ).not.toHaveBeenCalled();
  });

  it("flags a refund that may be recorded when the action throws", async () => {
    vi.mocked(
      recordReservationRefundAction
    ).mockRejectedValue(NETWORK_FAILURE);

    await expect(
      submitReservationRefund(VALID_REFUND_INPUT)
    ).resolves.toEqual({
      mayBeRecorded: true,
      result: {
        errors: {},
        formError: FEEDBACK.UNCONFIRMED,
        ok: false,
      },
    });
  });
});

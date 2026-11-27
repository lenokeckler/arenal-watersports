import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import type { ReservationDepositActionResult } from "../models/ReservationDepositActionResult.type";
import { submitReservationDeposit } from "../utils/submitReservationDeposit";
import {
  DEPOSIT_NETWORK_FAILURE,
  RECEIVED_RECORDED,
} from "./ReservationDepositAction.constants";
import { RECEIVED_DEPOSIT_INPUT } from "./ReservationDepositValues.constants";

vi.mock("@/app/utils/network/isBrowserOffline", () => ({
  isBrowserOffline: vi.fn(),
}));
vi.mock(
  "../actions/recordReservationDepositAction",
  () => ({
    recordReservationDepositAction: vi.fn(),
  })
);

describe("submitReservationDeposit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the action result when it answers", async () => {
    const result: ReservationDepositActionResult = {
      ok: true,
      recorded: RECEIVED_RECORDED,
    };
    vi.mocked(
      recordReservationDepositAction
    ).mockResolvedValue(result);

    await expect(
      submitReservationDeposit(RECEIVED_DEPOSIT_INPUT)
    ).resolves.toEqual({ mayBeRecorded: false, result });
  });

  it("answers offline without calling the action", async () => {
    vi.mocked(isBrowserOffline).mockReturnValue(true);

    await expect(
      submitReservationDeposit(RECEIVED_DEPOSIT_INPUT)
    ).resolves.toEqual({
      mayBeRecorded: false,
      result: {
        errors: {},
        formError: FEEDBACK.OFFLINE,
        ok: false,
      },
    });
    expect(
      recordReservationDepositAction
    ).not.toHaveBeenCalled();
  });

  it("flags a deposit that may be recorded when the action throws", async () => {
    vi.mocked(
      recordReservationDepositAction
    ).mockRejectedValue(DEPOSIT_NETWORK_FAILURE);

    await expect(
      submitReservationDeposit(RECEIVED_DEPOSIT_INPUT)
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

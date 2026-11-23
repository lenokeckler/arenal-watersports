import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { submitReservationExtraTime } from "../utils/submitReservationExtraTime";
import { EXTRA_TIME_CHARGED_INPUT } from "./ReservationExtraTime.constants";
import { EXTRA_TIME_CHARGED_RECORDED } from "./ReservationExtraTimeData.constants";

vi.mock(
  "../actions/recordReservationExtraTimeAction",
  () => ({
    recordReservationExtraTimeAction: vi.fn(),
  })
);

describe("submitReservationExtraTime", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("does not send anything while offline", async () => {
    vi.stubGlobal("navigator", { onLine: false });

    await expect(
      submitReservationExtraTime(EXTRA_TIME_CHARGED_INPUT)
    ).resolves.toEqual({
      errors: {},
      formError: FEEDBACK.OFFLINE,
      ok: false,
    });
    expect(
      recordReservationExtraTimeAction
    ).not.toHaveBeenCalled();
  });

  it("returns the action result", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockResolvedValue({
      ok: true,
      recorded: EXTRA_TIME_CHARGED_RECORDED,
    });

    await expect(
      submitReservationExtraTime(EXTRA_TIME_CHARGED_INPUT)
    ).resolves.toEqual({
      ok: true,
      recorded: EXTRA_TIME_CHARGED_RECORDED,
    });
  });

  it("asks to check the charges when the answer is lost", async () => {
    vi.mocked(
      recordReservationExtraTimeAction
    ).mockRejectedValue(new Error("network"));

    await expect(
      submitReservationExtraTime(EXTRA_TIME_CHARGED_INPUT)
    ).resolves.toEqual({
      errors: {},
      formError: FEEDBACK.UNCONFIRMED,
      ok: false,
    });
  });
});

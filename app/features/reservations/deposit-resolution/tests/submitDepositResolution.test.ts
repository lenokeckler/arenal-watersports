import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { resolveDepositAction } from "../actions/resolveDepositAction";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import { submitDepositResolution } from "../utils/submitDepositResolution";
import {
  PARTIAL_INPUT,
  PARTIAL_RECORDED,
  RESOLUTION_NETWORK_FAILURE,
} from "./DepositResolutionAction.constants";

vi.mock("@/app/utils/network/isBrowserOffline", () => ({
  isBrowserOffline: vi.fn(),
}));
vi.mock("../actions/resolveDepositAction", () => ({
  resolveDepositAction: vi.fn(),
}));

describe("submitDepositResolution", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns the action result when it answers", async () => {
    const result = {
      ok: true,
      recorded: PARTIAL_RECORDED,
    } as const;
    vi.mocked(resolveDepositAction).mockResolvedValue(
      result
    );

    await expect(
      submitDepositResolution(PARTIAL_INPUT)
    ).resolves.toEqual({ mayBeRecorded: false, result });
  });

  it("answers offline without calling the action", async () => {
    vi.mocked(isBrowserOffline).mockReturnValue(true);

    await expect(
      submitDepositResolution(PARTIAL_INPUT)
    ).resolves.toEqual({
      mayBeRecorded: false,
      result: {
        errors: {},
        formError: FEEDBACK.OFFLINE,
        ok: false,
      },
    });
    expect(resolveDepositAction).not.toHaveBeenCalled();
  });

  it("flags a resolution that may be recorded when the action throws", async () => {
    vi.mocked(resolveDepositAction).mockRejectedValue(
      RESOLUTION_NETWORK_FAILURE
    );

    await expect(
      submitDepositResolution(PARTIAL_INPUT)
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

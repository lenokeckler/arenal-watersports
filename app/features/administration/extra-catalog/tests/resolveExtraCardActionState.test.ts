import { describe, expect, it } from "vitest";
import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { resolveExtraCardActionState } from "../utils/resolveExtraCardActionState";
import { DEFAULT_EXTRA } from "./Extra.constants";

const INACTIVE_EXTRA = {
  ...DEFAULT_EXTRA,
  status: EXTRA_STATUS.INACTIVE,
};

describe("resolveExtraCardActionState", () => {
  it("offers removal for an active extra", () => {
    expect(
      resolveExtraCardActionState(DEFAULT_EXTRA, false)
    ).toBe(EXTRA_CARD_ACTION_STATE.REMOVE);
  });

  it("asks for confirmation when the active extra is being confirmed", () => {
    expect(
      resolveExtraCardActionState(DEFAULT_EXTRA, true)
    ).toBe(EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL);
  });

  it("offers reactivation for an inactive extra", () => {
    expect(
      resolveExtraCardActionState(INACTIVE_EXTRA, false)
    ).toBe(EXTRA_CARD_ACTION_STATE.REACTIVATE);
  });

  it("keeps offering reactivation for an inactive extra marked as being confirmed", () => {
    expect(
      resolveExtraCardActionState(INACTIVE_EXTRA, true)
    ).toBe(EXTRA_CARD_ACTION_STATE.REACTIVATE);
  });
});

import { describe, expect, it, vi } from "vitest";
import { STATUS } from "@/app/constants";
import { runComboAction } from "../utils/runComboAction";
import { FAKE_COMBO_ID } from "./Combo.constants";

vi.mock("next/navigation", () => ({
  unstable_rethrow: vi.fn(),
}));

const GENERIC_MESSAGE = "generic failure";
const SUCCESS_RESULT = {
  message: "done",
  status: STATUS.SUCCESS,
};

describe("runComboAction", () => {
  it("returns the result of the action", async () => {
    const action = vi
      .fn()
      .mockResolvedValue(SUCCESS_RESULT);

    const result = await runComboAction({
      action,
      comboId: FAKE_COMBO_ID,
      genericErrorMessage: GENERIC_MESSAGE,
    });

    expect(action).toHaveBeenCalledWith(FAKE_COMBO_ID);
    expect(result).toEqual(SUCCESS_RESULT);
  });

  it("turns a thrown error into the generic error result", async () => {
    const action = vi
      .fn()
      .mockRejectedValue(new Error("boom"));

    const result = await runComboAction({
      action,
      comboId: FAKE_COMBO_ID,
      genericErrorMessage: GENERIC_MESSAGE,
    });

    expect(result).toEqual({
      message: GENERIC_MESSAGE,
      status: STATUS.ERROR,
    });
  });
});

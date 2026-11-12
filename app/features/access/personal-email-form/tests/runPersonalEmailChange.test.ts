import { describe, expect, it, vi } from "vitest";
import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import { runPersonalEmailChange } from "../utils/runPersonalEmailChange";
import { SAVE_INPUT } from "./personalEmailForm.constants";
import {
  NETWORK_ERROR,
  UNKNOWN_ERROR,
} from "./personalEmailErrors.constants";
import { SERVICE_FAILURE_MESSAGE } from "./submitPersonalEmail.constants";

describe("runPersonalEmailChange", () => {
  it("passes the input to the operation and returns its success", async () => {
    const success = {
      ok: true,
      intent: PERSONAL_EMAIL_INTENT.SAVE,
    };
    const change = vi.fn().mockResolvedValue(success);

    await expect(
      runPersonalEmailChange(change, SAVE_INPUT)
    ).resolves.toEqual(success);

    expect(change).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(SAVE_INPUT);
  });

  it("returns the error the operation reports", async () => {
    const change = vi.fn().mockResolvedValue({
      ok: false,
      error: NETWORK_ERROR,
    });

    await expect(
      runPersonalEmailChange(change, SAVE_INPUT)
    ).resolves.toEqual({ ok: false, error: NETWORK_ERROR });
  });

  it("turns a throw from the operation into the unknown error", async () => {
    const change = vi
      .fn()
      .mockRejectedValue(
        new Error(SERVICE_FAILURE_MESSAGE)
      );

    await expect(
      runPersonalEmailChange(change, SAVE_INPUT)
    ).resolves.toEqual({ ok: false, error: UNKNOWN_ERROR });
  });
});

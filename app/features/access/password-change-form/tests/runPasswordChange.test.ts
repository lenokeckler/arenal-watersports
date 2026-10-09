import { describe, expect, it, vi } from "vitest";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { runPasswordChange } from "../utils/runPasswordChange";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  SERVICE_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
} from "./passwordChangeErrors.constants";

describe("runPasswordChange", () => {
  it("passes the input to the operation and returns its success", async () => {
    const change = vi.fn().mockResolvedValue({ ok: true });

    await expect(
      runPasswordChange(
        change,
        DEFAULT_PASSWORD_CHANGE_INPUT
      )
    ).resolves.toEqual({ ok: true });

    expect(change).toHaveBeenCalledOnce();
    expect(change).toHaveBeenCalledWith(
      DEFAULT_PASSWORD_CHANGE_INPUT
    );
  });

  it("returns the error the operation reports", async () => {
    const change = vi.fn().mockResolvedValue({
      ok: false,
      error: CURRENT_PASSWORD_INVALID_ERROR,
    });

    await expect(
      runPasswordChange(
        change,
        DEFAULT_PASSWORD_CHANGE_INPUT
      )
    ).resolves.toEqual({
      ok: false,
      error: CURRENT_PASSWORD_INVALID_ERROR,
    });
  });

  it("turns a throw from the operation into the unknown error", async () => {
    const change = vi
      .fn()
      .mockRejectedValue(
        new Error(SERVICE_FAILURE_MESSAGE)
      );

    await expect(
      runPasswordChange(
        change,
        DEFAULT_PASSWORD_CHANGE_INPUT
      )
    ).resolves.toEqual({ ok: false, error: UNKNOWN_ERROR });
  });
});

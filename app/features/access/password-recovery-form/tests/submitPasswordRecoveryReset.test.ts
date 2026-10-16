import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { resetPasswordWithPin } from "@/app/services/password-recovery";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import {
  LOCAL_SIGN_OUT_OPTIONS,
  LOGIN_RECOVERED_PATH,
  RESET_INPUT,
  SIGN_OUT_FAILURE_MESSAGE,
} from "./passwordRecoveryReset.constants";
import {
  arrangeResetMocks,
  signOut,
  submitReset,
} from "./passwordRecoveryResetSetup";

vi.mock("@/app/services/password-recovery", () => ({
  resetPasswordWithPin: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("next/server", () => ({
  after: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("submitPasswordRecoveryReset", () => {
  beforeEach(arrangeResetMocks);

  it("resets with the four posted fields untouched", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: true,
    });

    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(resetPasswordWithPin).toHaveBeenCalledOnce();
    expect(resetPasswordWithPin).toHaveBeenCalledWith(
      RESET_INPUT,
      expect.any(Function)
    );
  });

  it("signs this browser out locally, then redirects to the login with the notice", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: true,
    });

    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(signOut).toHaveBeenCalledOnce();
    expect(signOut).toHaveBeenCalledWith(
      LOCAL_SIGN_OUT_OPTIONS
    );
    expect(redirect).toHaveBeenCalledOnce();
    expect(redirect).toHaveBeenCalledWith(
      LOGIN_RECOVERED_PATH
    );
    expect(
      signOut.mock.invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(redirect).mock.invocationCallOrder[0]
    );
  });

  it("hands the service a task runner that defers to after", async () => {
    const task = vi.fn();
    vi.mocked(resetPasswordWithPin).mockImplementation(
      (_input, defer) => {
        defer(task);
        return Promise.resolve({ ok: true });
      }
    );

    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(after).toHaveBeenCalledOnce();
    expect(after).toHaveBeenCalledWith(task);
  });

  it("still redirects when the local sign-out answers an error", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: true,
    });
    signOut.mockResolvedValue({
      error: new Error(SIGN_OUT_FAILURE_MESSAGE),
    });

    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(redirect).toHaveBeenCalledWith(
      LOGIN_RECOVERED_PATH
    );
  });

  it("still redirects when the local sign-out throws", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: true,
    });
    signOut.mockRejectedValue(
      new Error(SIGN_OUT_FAILURE_MESSAGE)
    );

    await expect(submitReset()).rejects.toThrow(
      REDIRECT_SIGNAL_MESSAGE
    );

    expect(redirect).toHaveBeenCalledWith(
      LOGIN_RECOVERED_PATH
    );
  });
});

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
import { createServerSupabaseClient } from "@/app/services/supabase";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import {
  EMPTY_RESET_INPUT,
  LOCAL_SIGN_OUT_OPTIONS,
  LOGIN_RECOVERED_PATH,
  RESET_INPUT,
  RETURNED_ERRORS,
  SERVICE_FAILURE_MESSAGE,
  SIGN_OUT_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
} from "./passwordRecoveryReset.constants";

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

const signOut = vi.fn();

const submitReset = () =>
  submitPasswordRecoveryReset(
    null,
    createPasswordRecoveryResetFormData(RESET_INPUT)
  );

describe("submitPasswordRecoveryReset", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    signOut.mockResolvedValue({ error: null });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        auth: { signOut },
      } as never
    );
    vi.mocked(redirect).mockImplementation(() => {
      throw new Error(REDIRECT_SIGNAL_MESSAGE);
    });
  });

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

  it("reads missing fields as empty", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await submitPasswordRecoveryReset(null, new FormData());

    expect(resetPasswordWithPin).toHaveBeenCalledWith(
      EMPTY_RESET_INPUT,
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

  it.each(RETURNED_ERRORS)(
    "returns the %o error without signing out or redirecting",
    async (error) => {
      vi.mocked(resetPasswordWithPin).mockResolvedValue({
        error,
        ok: false,
      });

      await expect(submitReset()).resolves.toBe(error);

      expect(
        createServerSupabaseClient
      ).not.toHaveBeenCalled();
      expect(signOut).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    }
  );

  it("answers unknown when the service throws", async () => {
    vi.mocked(resetPasswordWithPin).mockRejectedValue(
      new Error(SERVICE_FAILURE_MESSAGE)
    );

    await expect(submitReset()).resolves.toEqual(
      UNKNOWN_ERROR
    );

    expect(signOut).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
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

  it("ignores the previous error", async () => {
    vi.mocked(resetPasswordWithPin).mockResolvedValue({
      ok: false,
      error: UNKNOWN_ERROR,
    });

    await expect(
      submitPasswordRecoveryReset(
        RETURNED_ERRORS[0],
        createPasswordRecoveryResetFormData(RESET_INPUT)
      )
    ).resolves.toBe(UNKNOWN_ERROR);
  });
});

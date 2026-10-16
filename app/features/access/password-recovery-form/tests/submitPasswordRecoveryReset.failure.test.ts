import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { redirect } from "next/navigation";
import { resetPasswordWithPin } from "@/app/services/password-recovery";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import {
  RESET_INPUT,
  RETURNED_ERRORS,
  SERVICE_FAILURE_MESSAGE,
  UNKNOWN_ERROR,
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

describe("submitPasswordRecoveryReset failures", () => {
  beforeEach(arrangeResetMocks);

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

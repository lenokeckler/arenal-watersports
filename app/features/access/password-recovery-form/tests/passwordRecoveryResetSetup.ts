import { vi } from "vitest";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { REDIRECT_SIGNAL_MESSAGE } from "@/app/utils/server-action/tests/redirectSignal.constants";
import { submitPasswordRecoveryReset } from "../actions/submitPasswordRecoveryReset";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import { RESET_INPUT } from "./passwordRecoveryReset.constants";

export const signOut = vi.fn();

export const arrangeResetMocks = (): void => {
  vi.resetAllMocks();
  signOut.mockResolvedValue({ error: null });
  vi.mocked(createServerSupabaseClient).mockResolvedValue({
    auth: { signOut },
  } as never);
  vi.mocked(redirect).mockImplementation(() => {
    throw new Error(REDIRECT_SIGNAL_MESSAGE);
  });
};

export const submitReset = () =>
  submitPasswordRecoveryReset(
    null,
    createPasswordRecoveryResetFormData(RESET_INPUT)
  );

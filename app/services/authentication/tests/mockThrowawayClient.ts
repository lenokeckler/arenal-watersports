import { vi } from "vitest";
import { createStatelessSupabaseClient } from "@/app/services/supabase";
import { captureArguments } from "./captureArguments";

export const throwawaySignInWithPassword = vi.fn();
export const throwawaySignOut = vi.fn();

export const mockThrowawayClient = (): void => {
  throwawaySignInWithPassword.mockResolvedValue({
    data: {},
    error: null,
  });
  throwawaySignOut.mockResolvedValue({ error: null });
  vi.mocked(createStatelessSupabaseClient).mockReturnValue({
    auth: {
      signInWithPassword: throwawaySignInWithPassword,
      signOut: throwawaySignOut,
    },
  } as unknown as ReturnType<
    typeof createStatelessSupabaseClient
  >);
};

export const THROWAWAY_SIGN_IN_SUCCESS = {
  data: {},
  error: null,
};
const THROWAWAY_SIGN_OUT_SUCCESS = { error: null };

const firstArguments =
  (callsOf: () => unknown[][]) => (): unknown[] =>
    callsOf().map(([argument]) => argument);

export const captureThrowawayCredentials = (
  results: unknown[] = [THROWAWAY_SIGN_IN_SUCCESS]
) =>
  firstArguments(
    captureArguments(throwawaySignInWithPassword, results)
  );

export const captureThrowawaySignOutOptions = () =>
  firstArguments(
    captureArguments(throwawaySignOut, [
      THROWAWAY_SIGN_OUT_SUCCESS,
    ])
  );

export const rejectedSignIn = (error: unknown) => ({
  data: {},
  error,
});

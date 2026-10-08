import { vi, type Mock } from "vitest";
import { createStatelessSupabaseClient } from "@/app/services/supabase";

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

const captureFirstArgument = (
  mock: Mock,
  result: unknown
): (() => unknown) => {
  let captured: unknown;
  mock.mockImplementation((argument: unknown) => {
    captured = argument;
    return Promise.resolve(result);
  });

  return () => captured;
};

export const captureThrowawayCredentials = () =>
  captureFirstArgument(throwawaySignInWithPassword, {
    data: {},
    error: null,
  });

export const captureThrowawaySignOutOptions = () =>
  captureFirstArgument(throwawaySignOut, { error: null });

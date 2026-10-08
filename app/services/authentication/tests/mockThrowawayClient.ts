import { vi } from "vitest";
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

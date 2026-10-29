import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { SIGNED_IN_USER_ID } from "./recordSignIn.constants";

export const signInWithPassword = vi.fn();
export const signOut = vi.fn();
export const getClaims = vi.fn();

export const mockSignInClient = (): void => {
  signInWithPassword.mockResolvedValue({
    data: { user: { id: SIGNED_IN_USER_ID } },
    error: null,
  });
  getClaims.mockResolvedValue({
    data: { claims: {} },
    error: null,
  });
  vi.mocked(createServerSupabaseClient).mockResolvedValue({
    auth: { signInWithPassword, signOut, getClaims },
  } as unknown as Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >);
};

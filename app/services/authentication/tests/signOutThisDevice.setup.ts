import { vi } from "vitest";
import type { BrowserSupabaseClient } from "@/app/services/supabase/models/BrowserSupabaseClient.type";
import { SIGN_OUT_FIXTURE } from "./signOutThisDevice.constants";

export const signOut = vi.fn();
export const getSession = vi.fn();
export const supabase = {
  auth: { signOut, getSession },
} as unknown as BrowserSupabaseClient;

export const writeAuthCookie = (): void => {
  document.cookie = `${SIGN_OUT_FIXTURE.AUTH_COOKIE_NAME}=${SIGN_OUT_FIXTURE.AUTH_COOKIE_VALUE}; path=/`;
  document.cookie = `${SIGN_OUT_FIXTURE.UNRELATED_COOKIE}; path=/`;
};

export const clearAllCookies = (): void => {
  document.cookie.split(";").forEach((pair) => {
    const name = pair.split("=")[0].trim();
    document.cookie = `${name}=; path=/; max-age=0`;
  });
};

export const arrangeLibraryAtRest = (): void => {
  vi.resetAllMocks();
  clearAllCookies();
  signOut.mockResolvedValue({ error: null });
  getSession.mockResolvedValue({
    data: { session: null },
    error: null,
  });
};

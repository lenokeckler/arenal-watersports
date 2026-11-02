import { createClient } from "@supabase/supabase-js";
import { expect } from "@playwright/test";
import { HTTP_STATUS } from "@/app/constants";
import {
  E2E_AUTH_ERROR_CODE,
  E2E_SUPABASE_CLIENT_OPTIONS,
} from "../constants/E2eSupabase.constants";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";

export const expectRefreshTokenRefused = async (
  refreshToken: string
): Promise<void> => {
  const { anonKey, url } = readLocalSupabaseEnvironment();
  const supabase = createClient(
    url,
    anonKey,
    E2E_SUPABASE_CLIENT_OPTIONS
  );

  const { data, error } =
    await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

  expect
    .soft(error?.code)
    .toBe(E2E_AUTH_ERROR_CODE.SESSION_GONE);
  expect.soft(error?.status).toBe(HTTP_STATUS.BAD_REQUEST);
  expect.soft(data.session).toBeNull();
};

import type { Cookie } from "@playwright/test";
import { E2E_REFRESH_TOKEN_ERROR } from "../constants/E2eLogoutToken.constants";
import { failE2eOperation } from "./failE2eOperation";
import { readStoredAuthSession } from "./readStoredAuthSession";

export const readRefreshTokenFromCookies = async (
  cookies: Cookie[]
): Promise<string> => {
  const stored = await readStoredAuthSession(cookies);

  return typeof stored.refresh_token === "string" &&
    stored.refresh_token
    ? stored.refresh_token
    : failE2eOperation(
        E2E_REFRESH_TOKEN_ERROR.READ_OPERATION,
        E2E_REFRESH_TOKEN_ERROR.NO_REFRESH_TOKEN
      );
};

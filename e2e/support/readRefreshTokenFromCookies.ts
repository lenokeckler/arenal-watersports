import type { Cookie } from "@playwright/test";
import {
  combineChunks,
  stringFromBase64URL,
} from "@supabase/ssr";
import { SUPABASE_AUTH_COOKIE } from "@/app/constants";
import {
  E2E_AUTH_COOKIE_ENCODING,
  E2E_REFRESH_TOKEN_ERROR,
} from "../constants/E2eLogoutToken.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { StoredAuthSession } from "./models/StoredAuthSession.interface";

export const readRefreshTokenFromCookies = async (
  cookies: Cookie[]
): Promise<string> => {
  const encoded = await combineChunks(
    SUPABASE_AUTH_COOKIE.NAME,
    (name) =>
      cookies.find((cookie) => cookie.name === name)?.value
  );

  if (
    !encoded?.startsWith(
      E2E_AUTH_COOKIE_ENCODING.BASE64_PREFIX
    )
  ) {
    return failE2eOperation(
      E2E_REFRESH_TOKEN_ERROR.READ_OPERATION,
      E2E_REFRESH_TOKEN_ERROR.NOT_BASE64
    );
  }

  const stored: StoredAuthSession = JSON.parse(
    stringFromBase64URL(
      encoded.slice(
        E2E_AUTH_COOKIE_ENCODING.BASE64_PREFIX.length
      )
    )
  );

  return typeof stored.refresh_token === "string" &&
    stored.refresh_token
    ? stored.refresh_token
    : failE2eOperation(
        E2E_REFRESH_TOKEN_ERROR.READ_OPERATION,
        E2E_REFRESH_TOKEN_ERROR.NO_REFRESH_TOKEN
      );
};

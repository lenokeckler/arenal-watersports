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

export const readStoredAuthSession = async (
  cookies: Cookie[]
): Promise<StoredAuthSession> => {
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

  return JSON.parse(
    stringFromBase64URL(
      encoded.slice(
        E2E_AUTH_COOKIE_ENCODING.BASE64_PREFIX.length
      )
    )
  );
};

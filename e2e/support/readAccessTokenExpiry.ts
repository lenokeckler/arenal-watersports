import type { Cookie } from "@playwright/test";
import { stringFromBase64URL } from "@supabase/ssr";
import {
  E2E_ACCESS_TOKEN,
  E2E_ACCESS_TOKEN_ERROR,
} from "../constants/E2eLogoutOldToken.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { AccessTokenPayload } from "./models/AccessTokenPayload.interface";
import { readStoredAuthSession } from "./readStoredAuthSession";

export const readAccessTokenExpiry = async (
  cookies: Cookie[]
): Promise<Date> => {
  const { access_token: accessToken } =
    await readStoredAuthSession(cookies);

  if (typeof accessToken !== "string") {
    return failE2eOperation(
      E2E_ACCESS_TOKEN_ERROR.READ_OPERATION,
      E2E_ACCESS_TOKEN_ERROR.MISSING
    );
  }

  const payload: AccessTokenPayload = JSON.parse(
    stringFromBase64URL(
      accessToken.split(E2E_ACCESS_TOKEN.SEPARATOR)[
        E2E_ACCESS_TOKEN.PAYLOAD_INDEX
      ]
    )
  );

  return typeof payload.exp === "number"
    ? new Date(payload.exp * E2E_ACCESS_TOKEN.MS_PER_SECOND)
    : failE2eOperation(
        E2E_ACCESS_TOKEN_ERROR.READ_OPERATION,
        E2E_ACCESS_TOKEN_ERROR.NO_EXPIRY
      );
};

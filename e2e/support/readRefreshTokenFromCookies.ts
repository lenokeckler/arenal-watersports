import type { Cookie } from "@playwright/test";
import { SUPABASE_AUTH_COOKIE } from "@/app/constants";
import {
  E2E_AUTH_COOKIE_ENCODING,
  E2E_REFRESH_GRANT_ERROR,
} from "../constants/E2eLogoutToken.constants";
import { E2E_REFRESH_GRANT } from "../constants/E2eLogoutToken.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { RefreshGrantBody } from "./models/RefreshGrantBody.type";

const readChunkIndex = (name: string): number =>
  Number(
    name.split(SUPABASE_AUTH_COOKIE.CHUNK_SEPARATOR).pop()
  );

const joinValues = (cookies: Cookie[]): string =>
  [...cookies]
    .sort(
      (left, right) =>
        readChunkIndex(left.name) -
        readChunkIndex(right.name)
    )
    .map(({ value }) => value)
    .join(E2E_AUTH_COOKIE_ENCODING.JOINED_CHUNKS_SEPARATOR);

const decodeSession = (joined: string): unknown =>
  JSON.parse(
    Buffer.from(
      joined.slice(
        E2E_AUTH_COOKIE_ENCODING.BASE64_PREFIX.length
      ),
      E2E_AUTH_COOKIE_ENCODING.BASE64_URL
    ).toString(E2E_AUTH_COOKIE_ENCODING.UTF8)
  );

export const readRefreshTokenFromCookies = (
  cookies: Cookie[]
): string => {
  const session = decodeSession(joinValues(cookies));
  const refreshToken =
    typeof session === "object" && session !== null
      ? (session as RefreshGrantBody)[
          E2E_REFRESH_GRANT.REFRESH_TOKEN_FIELD
        ]
      : undefined;

  return typeof refreshToken === "string" && refreshToken
    ? refreshToken
    : failE2eOperation(
        E2E_REFRESH_GRANT_ERROR.READ_OPERATION,
        E2E_REFRESH_GRANT_ERROR.NO_REFRESH_TOKEN
      );
};

import { PATHS, STRING } from "@/app/constants";
import type { SessionAccess } from "@/app/services/supabase/models/SessionAccess.interface";
import type { NullableRef } from "@/app/types";
import { buildLoginSessionIdlePath } from "@/app/utils/pathname/buildLoginSessionIdlePath";

const PENDING_PASSWORD_PATHS: readonly string[] = [
  PATHS.ACCESS.FIRST_SIGN_IN,
  PATHS.ACCESS.LOGIN,
];

const isPreLoginPath = (pathname: string): boolean =>
  pathname === PATHS.ACCESS.ROOT ||
  pathname.startsWith(
    `${PATHS.ACCESS.ROOT}${STRING.SLASH}`
  );

const resolveLoginPath = (
  isSessionIdle: boolean
): string =>
  isSessionIdle
    ? buildLoginSessionIdlePath()
    : PATHS.ACCESS.LOGIN;

const resolveSignedOutRedirect = (
  pathname: string,
  isSessionIdle: boolean
): NullableRef<string> =>
  isPreLoginPath(pathname) &&
  pathname !== PATHS.ACCESS.FIRST_SIGN_IN
    ? null
    : resolveLoginPath(isSessionIdle);

const resolvePendingPasswordRedirect = (
  pathname: string
): NullableRef<string> =>
  PENDING_PASSWORD_PATHS.includes(pathname)
    ? null
    : PATHS.ACCESS.FIRST_SIGN_IN;

const resolveSettledPasswordRedirect = (
  pathname: string
): NullableRef<string> =>
  pathname === PATHS.ACCESS.FIRST_SIGN_IN
    ? PATHS.HOME
    : null;

export const resolveProxyRedirect = (
  pathname: string,
  {
    hasSession,
    isSessionIdle,
    mustChangePassword,
  }: SessionAccess
): NullableRef<string> => {
  if (!hasSession) {
    return resolveSignedOutRedirect(
      pathname,
      isSessionIdle
    );
  }

  return mustChangePassword
    ? resolvePendingPasswordRedirect(pathname)
    : resolveSettledPasswordRedirect(pathname);
};

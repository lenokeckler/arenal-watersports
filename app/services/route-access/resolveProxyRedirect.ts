import { PATHS, STRING } from "@/app/constants";
import type { SessionAccess } from "@/app/services/supabase/models/SessionAccess.interface";
import type { NullableRef } from "@/app/types";

const PENDING_PASSWORD_PATHS: readonly string[] = [
  PATHS.ACCESS.FIRST_SIGN_IN,
  PATHS.ACCESS.LOGIN,
];

const isPreLoginPath = (pathname: string): boolean =>
  pathname === PATHS.ACCESS.ROOT ||
  pathname.startsWith(
    `${PATHS.ACCESS.ROOT}${STRING.SLASH}`
  );

const resolveSignedOutRedirect = (
  pathname: string
): NullableRef<string> =>
  isPreLoginPath(pathname) &&
  pathname !== PATHS.ACCESS.FIRST_SIGN_IN
    ? null
    : PATHS.ACCESS.LOGIN;

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
  { hasSession, mustChangePassword }: SessionAccess
): NullableRef<string> => {
  if (!hasSession) {
    return resolveSignedOutRedirect(pathname);
  }

  return mustChangePassword
    ? resolvePendingPasswordRedirect(pathname)
    : resolveSettledPasswordRedirect(pathname);
};

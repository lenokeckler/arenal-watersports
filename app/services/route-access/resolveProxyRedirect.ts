import { PATHS, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";

const isPreLoginPath = (pathname: string): boolean =>
  pathname === PATHS.ACCESS.ROOT ||
  pathname.startsWith(
    `${PATHS.ACCESS.ROOT}${STRING.SLASH}`
  );

export const resolveProxyRedirect = (
  pathname: string,
  hasSession: boolean
): NullableRef<string> =>
  hasSession || isPreLoginPath(pathname)
    ? null
    : PATHS.ACCESS.LOGIN;

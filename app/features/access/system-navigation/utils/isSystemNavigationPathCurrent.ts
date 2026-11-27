import { PATHS, STRING } from "@/app/constants";

export const isSystemNavigationPathCurrent = (
  href: string,
  pathname: string
): boolean =>
  (href === PATHS.BOARD && pathname === PATHS.HOME) ||
  pathname === href ||
  pathname.startsWith(`${href}${STRING.SLASH}`);

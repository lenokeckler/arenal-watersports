import { STRING } from "@/app/constants";

const REPEATED_SLASHES = /\/{2,}/g;

export const canonicalizePathname = (
  pathname: string
): string => {
  const collapsed = pathname.replace(
    REPEATED_SLASHES,
    STRING.SLASH
  );

  return collapsed.length > STRING.SLASH.length &&
    collapsed.endsWith(STRING.SLASH)
    ? collapsed.slice(0, -STRING.SLASH.length)
    : collapsed;
};

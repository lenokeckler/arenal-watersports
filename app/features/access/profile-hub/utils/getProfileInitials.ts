const MAX_INITIALS = 2;
const WHITESPACE = /\s+/;

export const getProfileInitials = (
  fullName: string
): string =>
  fullName
    .split(WHITESPACE)
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

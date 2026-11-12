const MAX_INITIALS = 2;

export const getProfileInitials = (
  fullName: string
): string =>
  fullName
    .split(/s+/)
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

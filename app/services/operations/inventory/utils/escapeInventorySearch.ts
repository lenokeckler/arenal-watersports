const LIKE_SPECIAL_CHARACTERS = /[\\%_]/g;

export const escapeInventorySearch = (
  query: string
): string =>
  query.trim().replace(LIKE_SPECIAL_CHARACTERS, "\\$&");

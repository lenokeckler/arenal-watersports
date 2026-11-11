export const TEMPORARY_PASSWORD = {
  LENGTH: 14,
  CHARACTER_SETS: [
    "ABCDEFGHJKLMNPQRSTUVWXYZ",
    "abcdefghijkmnopqrstuvwxyz",
    "23456789",
    "!#$%*+-=?@",
  ],
} as const;

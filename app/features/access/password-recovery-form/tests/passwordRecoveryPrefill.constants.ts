import { USERNAME } from "@/app/constants";

export const ACCEPTED_USERNAME = "ana.perez";
export const PADDED_MIXED_CASE_USERNAME = "  Ana.Perez ";
export const MARKUP_LIKE_USERNAME = "<script>";
export const TOO_SHORT_USERNAME = "a";
export const WHITESPACE_ONLY = "   ";
export const TOO_LONG_USERNAME = "a".repeat(
  USERNAME.LENGTH.MAX + 1
);
export const MAX_LENGTH_USERNAME = "a".repeat(
  USERNAME.LENGTH.MAX
);
export const REPEATED_PARAM = [
  ACCEPTED_USERNAME,
  ACCEPTED_USERNAME,
];

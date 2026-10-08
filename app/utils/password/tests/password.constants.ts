import { PASSWORD_LENGTH, STRING } from "@/app/constants";
import type { CharacterRange } from "../models/CharacterRange.interface";

const LOWERCASE_FILLER = "a";

export const COMPLIANT_PASSWORD = "Abcdef1!";

export const PASSWORD_WITH_ONLY_UPPERCASE = "ABCDEFGH";
export const PASSWORD_WITH_ONLY_LOWERCASE = "abcdefgh";
export const PASSWORD_WITH_ONLY_DIGITS = "12345678";
export const PASSWORD_WITH_ONLY_SYMBOLS = "!@#$%^&*";

export const PASSWORD_WITHOUT_UPPERCASE = "abcdef1!";
export const PASSWORD_WITHOUT_LOWERCASE = "ABCDEF1!";
export const PASSWORD_WITHOUT_DIGIT = "Abcdefg!";
export const PASSWORD_WITHOUT_SYMBOL = "Abcdefg1";

export const NON_ASCII_CHARACTERS = [
  "¡",
  "¿",
  "ñ",
  "Ñ",
  "á",
  "Á",
];

export const SPACE_CHARACTER = STRING.SPACE;

export const SUPABASE_SYMBOLS = [
  ..."!@#$%^&*()_+-=[]{};'\\:\"|<>?,./`~",
];

export const CHARACTER_BEFORE_UPPERCASE = "@";
export const CHARACTER_AFTER_UPPERCASE = "[";
export const CHARACTER_BEFORE_LOWERCASE = "`";
export const CHARACTER_AFTER_LOWERCASE = "{";
export const CHARACTER_BEFORE_DIGIT = "/";
export const CHARACTER_AFTER_DIGIT = ":";

export const buildPasswordOfLength = (
  length: number
): string => LOWERCASE_FILLER.repeat(length);

export const LENGTH_CASES: [number, boolean][] = [
  [0, false],
  [PASSWORD_LENGTH.MIN - 1, false],
  [PASSWORD_LENGTH.MIN, true],
  [PASSWORD_LENGTH.MAX, true],
  [PASSWORD_LENGTH.MAX + 1, false],
];

export const CUSTOM_RANGE: CharacterRange = {
  FIRST: "b",
  LAST: "d",
};
export const CHARACTER_INSIDE_CUSTOM_RANGE = "c";
export const CHARACTER_BELOW_CUSTOM_RANGE = "a";
export const CHARACTER_ABOVE_CUSTOM_RANGE = "e";

export const SYMBOL_EXAMPLE = "!";

import { PASSWORD_LENGTH, STRING } from "@/app/constants";
import type { CharacterRange } from "../models/CharacterRange.interface";

const LOWERCASE_FILLER = "a";
const TWO_BYTE_CHARACTER = "á";

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

export const EMPTY_LENGTH = 0;
export const SINGLE_CHARACTER_LENGTH = 1;

export const LENGTH_CASES: [number, boolean][] = [
  [EMPTY_LENGTH, false],
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

const EMOJI = "\u{1F600}";
const COMPLIANT_PREFIX = "Aa1!";
const PASSWORD_WITHOUT_SYMBOL_PREFIX = "Abcdefg1";

export const EMOJI_PASSWORD_AT_MIN_LENGTH_IN_CODE_UNITS = `Abc1!${EMOJI}x`;
export const EMOJI_PASSWORD_AT_MAX_LENGTH_IN_CODE_UNITS =
  COMPLIANT_PREFIX +
  EMOJI.repeat(
    (PASSWORD_LENGTH.MAX - COMPLIANT_PREFIX.length) /
      EMOJI.length
  );
export const EMOJI_PASSWORD_ABOVE_MAX_LENGTH_IN_CODE_UNITS =
  EMOJI_PASSWORD_AT_MAX_LENGTH_IN_CODE_UNITS + EMOJI;
export const EMOJI_AS_ONLY_SYMBOL = `${PASSWORD_WITHOUT_SYMBOL_PREFIX}${EMOJI}`;

export const LOOKALIKE_CLASS_PASSWORDS = [
  "Abcdefg!\uFF11",
  "abcdef1!\uFF21",
  "ABCDEF1!\u00DF",
  `${PASSWORD_WITHOUT_SYMBOL_PREFIX}\uFF01`,
  `${PASSWORD_WITHOUT_SYMBOL_PREFIX}\u00A7`,
  `${PASSWORD_WITHOUT_SYMBOL_PREFIX}\u20AC`,
  `${PASSWORD_WITHOUT_SYMBOL_PREFIX}\t`,
  `${PASSWORD_WITHOUT_SYMBOL_PREFIX}\u00A0`,
];

const buildMaxLengthPasswordWithExtraBytes = (
  extraBytes: number
): string =>
  LOWERCASE_FILLER.repeat(
    PASSWORD_LENGTH.MAX - extraBytes
  ) + TWO_BYTE_CHARACTER.repeat(extraBytes);

const EXTRA_BYTES_AT_BYTE_LIMIT =
  PASSWORD_LENGTH.MAX_BYTES - PASSWORD_LENGTH.MAX;

export const MAX_LENGTH_PASSWORD_AT_BYTE_LIMIT =
  buildMaxLengthPasswordWithExtraBytes(
    EXTRA_BYTES_AT_BYTE_LIMIT
  );
export const MAX_LENGTH_PASSWORD_ONE_BYTE_ABOVE_LIMIT =
  buildMaxLengthPasswordWithExtraBytes(
    EXTRA_BYTES_AT_BYTE_LIMIT + 1
  );
export const MAX_LENGTH_PASSWORD_OF_TWO_BYTE_CHARACTERS =
  COMPLIANT_PREFIX +
  TWO_BYTE_CHARACTER.repeat(
    PASSWORD_LENGTH.MAX - COMPLIANT_PREFIX.length
  );

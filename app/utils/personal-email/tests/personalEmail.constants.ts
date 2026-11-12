import {
  PASSWORD_LENGTH,
  PERSONAL_EMAIL,
  PERSONAL_EMAIL_INTENT,
} from "@/app/constants";

import type { PersonalEmailChangeInput } from "../models/PersonalEmailChangeInput.interface";

const DOMAIN_SUFFIX = "@correo.com";
const LABEL_MAX_LENGTH = 63;
const FILLER = "a";
const LABEL_FILLER = "b";
const SURROUNDING_SPACES = "  ";
const MAX_LABEL = LABEL_FILLER.repeat(LABEL_MAX_LENGTH);
const LAST_LABEL_LENGTH = 61;
const LAST_LABEL = LABEL_FILLER.repeat(LAST_LABEL_LENGTH);
const LOCAL_PART_FILLER = FILLER.repeat(
  PERSONAL_EMAIL.LOCAL_PART_MAX_LENGTH
);

export const VALID_ADDRESS = "ana.perez@correo.com";
export const PASSWORD = "Clave-actual-1!";
export const UNKNOWN_INTENT = "archive";
export const PROTOTYPE_KEY_CODE = "toString";
export const PASSWORD_ONE_ABOVE_MAX = FILLER.repeat(
  PASSWORD_LENGTH.MAX + 1
);

export const NEWLINE_INJECTION =
  "ana@correo.com\r\nBcc:x@y.com";
export const EMBEDDED_NUL = "ana\u0000@correo.com";
export const ZERO_WIDTH_SPACE = "ana\u200b@correo.com";

export const ADDRESS_AT_MAX = `${LOCAL_PART_FILLER}@${MAX_LABEL}.${MAX_LABEL}.${LAST_LABEL}`;
export const ADDRESS_ONE_ABOVE_MAX = `${ADDRESS_AT_MAX}${LABEL_FILLER}`;
export const LOCAL_PART_AT_MAX =
  LOCAL_PART_FILLER + DOMAIN_SUFFIX;
export const LOCAL_PART_ONE_ABOVE_MAX =
  FILLER + LOCAL_PART_AT_MAX;

export const ACCEPTED_ADDRESS_CASES: [
  string,
  string,
  string,
][] = [
  ["a plain address", VALID_ADDRESS, VALID_ADDRESS],
  [
    "uppercase letters, lowercased",
    "ANA.Perez@Correo.COM",
    VALID_ADDRESS,
  ],
  [
    "surrounding spaces, trimmed",
    `${SURROUNDING_SPACES}${VALID_ADDRESS}${SURROUNDING_SPACES}`,
    VALID_ADDRESS,
  ],
  [
    "plus addressing",
    "ana+rentas@correo.com",
    "ana+rentas@correo.com",
  ],
  [
    "an apostrophe in the local part",
    "o'brien@correo.com",
    "o'brien@correo.com",
  ],
  ["a domain without a dot", "ana@correo", "ana@correo"],
  [
    "a hyphen inside a label",
    "ana@mi-correo.com",
    "ana@mi-correo.com",
  ],
  [
    "a label of 63 characters",
    `ana@${MAX_LABEL}.com`,
    `ana@${MAX_LABEL}.com`,
  ],
  [
    "the Kelvin sign, lowercased to ASCII",
    "Kelvin@correo.com",
    "kelvin@correo.com",
  ],
  [
    "a local part of 64 characters",
    LOCAL_PART_AT_MAX,
    LOCAL_PART_AT_MAX,
  ],
  [
    "the longest allowed length",
    ADDRESS_AT_MAX,
    ADDRESS_AT_MAX,
  ],
];

export const INVALID_ADDRESS_CASES: [string, string][] = [
  ["no at sign", "ana.correo.com"],
  ["two at signs", "ana@@correo.com"],
  ["an empty local part", "@correo.com"],
  ["an empty domain", "ana@"],
  ["consecutive dots in the domain", "ana@correo..com"],
  ["a leading hyphen in a label", "ana@-correo.com"],
  ["a trailing hyphen in a label", "ana@correo-.com"],
  [
    "a label of 64 characters",
    `ana@${MAX_LABEL}${LABEL_FILLER}.com`,
  ],
  ["a space inside", "an a@correo.com"],
  ["a comma", "ana,perez@correo.com"],
  ["a newline injection", NEWLINE_INJECTION],
  ["an embedded NUL", EMBEDDED_NUL],
  ["a zero-width space", ZERO_WIDTH_SPACE],
  ["an underscore in the domain", "ana@mi_correo.com"],
];

export const UPPERCASE_INTENT = "SAVE";
export const INVALID_ADDRESS = "not-an-address";
export const GROWING_LOWERCASE_LETTER = "\u0130";
export const GROWING_LOWERCASE_ADDRESS =
  GROWING_LOWERCASE_LETTER.repeat(
    Math.ceil(PERSONAL_EMAIL.MAX_LENGTH / 2)
  ) + DOMAIN_SUFFIX;

export const DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT: PersonalEmailChangeInput =
  {
    currentPassword: PASSWORD,
    email: VALID_ADDRESS,
    intent: PERSONAL_EMAIL_INTENT.SAVE,
  };

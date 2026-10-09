import path from "node:path";
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

export const VALID_ADDRESS = "ana.perez@correo.com";
export const PASSWORD = "Clave-actual-1!";
export const UNKNOWN_INTENT = "archive";
export const PASSWORD_ONE_ABOVE_MAX = FILLER.repeat(
  PASSWORD_LENGTH.MAX + 1
);

export const NEWLINE_INJECTION =
  "ana@correo.com\r\nBcc:x@y.com";
export const EMBEDDED_NUL = "ana\u0000@correo.com";
export const ZERO_WIDTH_SPACE = "ana\u200b@correo.com";

export const ADDRESS_AT_MAX =
  FILLER.repeat(
    PERSONAL_EMAIL.MAX_LENGTH - DOMAIN_SUFFIX.length
  ) + DOMAIN_SUFFIX;
export const ADDRESS_ONE_ABOVE_MAX =
  FILLER + ADDRESS_AT_MAX;

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

export const MIGRATION_PATH = path.join(
  process.cwd(),
  "supabase",
  "migrations",
  "20260828003200_worker_personal_email_format.sql"
);
export const MIGRATION_ENCODING = "utf8";
export const SQL_QUOTE = "'";
export const SQL_QUOTE_ESCAPED = "''";

export const DEFAULT_PERSONAL_EMAIL_CHANGE_INPUT: PersonalEmailChangeInput =
  {
    currentPassword: PASSWORD,
    email: VALID_ADDRESS,
    intent: PERSONAL_EMAIL_INTENT.SAVE,
  };

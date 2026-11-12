import {
  SUPABASE_WORK_AREA,
  USERNAME,
  WORKER_FULL_NAME_LENGTH,
} from "@/app/constants";

const LETTER = "a";

export const REGISTRATION_FIXTURE = {
  FULL_NAME: "Celso Rojas Mora",
  SPACED_FULL_NAME: "  Celso   Rojas\tMora  ",
  USERNAME: "celso.rojas",
  SPACED_UPPERCASE_USERNAME: "  Celso.Rojas ",
  LONGEST_FULL_NAME: LETTER.repeat(
    WORKER_FULL_NAME_LENGTH.MAX
  ),
  TOO_LONG_FULL_NAME: LETTER.repeat(
    WORKER_FULL_NAME_LENGTH.MAX + 1
  ),
  SHORTEST_USERNAME: LETTER.repeat(USERNAME.LENGTH.MIN),
  TOO_SHORT_USERNAME: LETTER.repeat(
    USERNAME.LENGTH.MIN - 1
  ),
  LONGEST_USERNAME: LETTER.repeat(USERNAME.LENGTH.MAX),
  TOO_LONG_USERNAME: LETTER.repeat(USERNAME.LENGTH.MAX + 1),
  ALLOWED_SYMBOLS_USERNAME: "ana_b-c.2",
  BLANK: "   ",
} as const;

export const INVALID_USERNAMES = [
  "ana rojas",
  "ana@arenal",
  "ana/rojas",
  "año",
  "ana+1",
] as const;

export const UNASSIGNABLE_BASE_ROLES = [
  SUPABASE_WORK_AREA.ADMINISTRATION,
  "",
  "gerencia",
  "OPERACIONES",
] as const;

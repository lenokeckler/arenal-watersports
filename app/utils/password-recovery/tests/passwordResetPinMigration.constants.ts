import path from "node:path";

const MIGRATION_FILE_NAME =
  "20261016000200_issue_password_reset_pin.sql";

export const MIGRATION_PATH = path.resolve(
  "supabase",
  "migrations",
  MIGRATION_FILE_NAME
);
export const MIGRATION_ENCODING = "utf8";
export const WHITESPACE_RUN = /\s+/g;
export const SINGLE_SPACE = " ";
export const SQL_PIN_LENGTH_FUNCTION =
  /create function password_reset_pin_length\(\) returns smallint language sql immutable set search_path = '' as \$\$ select (\d+)::smallint;/;
export const SQL_PIN_LENGTH_GROUP = 1;

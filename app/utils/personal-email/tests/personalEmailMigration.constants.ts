import path from "node:path";

export const MIGRATION_PATH = path.join(
  process.cwd(),
  "supabase",
  "migrations",
  "20260828003200_worker_personal_email_format.sql"
);
export const MIGRATION_ENCODING = "utf8";
export const SQL_QUOTE = "'";
export const SQL_QUOTE_ESCAPED = "''";
export const SQL_MAX_LENGTH_CLAUSE =
  "char_length(personal_email) <=";
export const SQL_LOCAL_PART_MAX_LENGTH_CLAUSE =
  "char_length(split_part(personal_email, '@', 1)) <=";

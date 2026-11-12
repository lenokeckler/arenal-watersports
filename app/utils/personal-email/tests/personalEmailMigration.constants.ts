import path from "node:path";

export const MIGRATION_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "..",
  "supabase",
  "migrations",
  "20260828003200_worker_personal_email_format.sql"
);
export const MIGRATION_ENCODING = "utf8";
export const WHITESPACE_RUN = /\s+/g;
export const SINGLE_SPACE = " ";
export const SQL_QUOTE = "'";
export const SQL_QUOTE_ESCAPED = "''";
export const SQL_CASE_SENSITIVE_MATCH_OPERATOR = "~ '";
export const SQL_NORMALISATION_CLAUSE =
  "personal_email = lower(btrim(personal_email))";
export const SQL_MAX_LENGTH_CLAUSE_SOURCE = String.raw`char_length\(personal_email\) <= `;
export const SQL_LOCAL_PART_MAX_LENGTH_CLAUSE_SOURCE = String.raw`char_length\(split_part\(personal_email, '@', 1\)\) <= `;
export const WHOLE_NUMBER_BOUNDARY = String.raw`\b`;

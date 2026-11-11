import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL } from "@/app/constants";
import {
  MIGRATION_ENCODING,
  MIGRATION_PATH,
  SINGLE_SPACE,
  SQL_CASE_SENSITIVE_MATCH_OPERATOR,
  SQL_LOCAL_PART_MAX_LENGTH_CLAUSE_SOURCE,
  SQL_MAX_LENGTH_CLAUSE_SOURCE,
  SQL_NORMALISATION_CLAUSE,
  SQL_QUOTE,
  SQL_QUOTE_ESCAPED,
  WHITESPACE_RUN,
  WHOLE_NUMBER_BOUNDARY,
} from "./personalEmailMigration.constants";

describe("personal email database check", () => {
  const migration = readFileSync(
    MIGRATION_PATH,
    MIGRATION_ENCODING
  ).replace(WHITESPACE_RUN, SINGLE_SPACE);

  it("matches the same pattern as the application with the case-sensitive operator", () => {
    const sqlPattern =
      PERSONAL_EMAIL.PATTERN.source.replaceAll(
        SQL_QUOTE,
        SQL_QUOTE_ESCAPED
      );

    expect(migration).toContain(
      `${SQL_CASE_SENSITIVE_MATCH_OPERATOR}${sqlPattern}${SQL_QUOTE}`
    );
  });

  it("requires the normalised form", () => {
    expect(migration).toContain(SQL_NORMALISATION_CLAUSE);
  });

  it("embeds the same maximum length as the application", () => {
    expect(migration).toMatch(
      new RegExp(
        `${SQL_MAX_LENGTH_CLAUSE_SOURCE}${PERSONAL_EMAIL.MAX_LENGTH}${WHOLE_NUMBER_BOUNDARY}`
      )
    );
  });

  it("embeds the same local part maximum length as the application", () => {
    expect(migration).toMatch(
      new RegExp(
        `${SQL_LOCAL_PART_MAX_LENGTH_CLAUSE_SOURCE}${PERSONAL_EMAIL.LOCAL_PART_MAX_LENGTH}${WHOLE_NUMBER_BOUNDARY}`
      )
    );
  });
});

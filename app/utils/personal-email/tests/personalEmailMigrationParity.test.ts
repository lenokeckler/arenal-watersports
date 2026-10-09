import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL } from "@/app/constants";
import {
  MIGRATION_ENCODING,
  MIGRATION_PATH,
  SQL_LOCAL_PART_MAX_LENGTH_CLAUSE,
  SQL_MAX_LENGTH_CLAUSE,
  SQL_QUOTE,
  SQL_QUOTE_ESCAPED,
} from "./personalEmailMigration.constants";

describe("personal email database check", () => {
  const migration = readFileSync(
    MIGRATION_PATH,
    MIGRATION_ENCODING
  );

  it("embeds the same pattern as the application", () => {
    const sqlPattern =
      PERSONAL_EMAIL.PATTERN.source.replaceAll(
        SQL_QUOTE,
        SQL_QUOTE_ESCAPED
      );

    expect(migration).toContain(`'${sqlPattern}'`);
  });

  it("embeds the same maximum length as the application", () => {
    expect(migration).toContain(
      `${SQL_MAX_LENGTH_CLAUSE} ${PERSONAL_EMAIL.MAX_LENGTH}`
    );
  });

  it("embeds the same local part maximum length as the application", () => {
    expect(migration).toContain(
      `${SQL_LOCAL_PART_MAX_LENGTH_CLAUSE} ${PERSONAL_EMAIL.LOCAL_PART_MAX_LENGTH}`
    );
  });
});

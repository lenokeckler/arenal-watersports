import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const MIGRATIONS_DIRECTORY = join("supabase", "migrations");
const MIGRATION_FILE_PATTERN = /^(\d{14})_[a-z0-9_]+\.sql$/;
const EMPTY_LIST_LENGTH = 0;

const listMigrationFiles = () =>
  readdirSync(MIGRATIONS_DIRECTORY).filter((file) =>
    file.endsWith(".sql")
  );

describe("supabase migrations", () => {
  it("name every file with a 14 digit version and a snake case title", () => {
    const misnamed = listMigrationFiles().filter(
      (file) => !MIGRATION_FILE_PATTERN.test(file)
    );

    expect(misnamed).toEqual([]);
  });

  it("never repeat a version, because the CLI keeps one history row per version", () => {
    const versions = listMigrationFiles().map(
      (file) => file.match(MIGRATION_FILE_PATTERN)?.[1]
    );
    const repeated = versions.filter(
      (version, index) =>
        versions.indexOf(version) !== index
    );

    expect(repeated).toHaveLength(EMPTY_LIST_LENGTH);
  });
});

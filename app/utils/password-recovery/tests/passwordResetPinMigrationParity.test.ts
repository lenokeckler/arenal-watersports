import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PASSWORD_RESET_PIN } from "@/app/constants";
import {
  MIGRATION_ENCODING,
  MIGRATION_PATH,
  SINGLE_SPACE,
  SQL_PIN_LENGTH_FUNCTION,
  SQL_PIN_LENGTH_GROUP,
  WHITESPACE_RUN,
} from "./passwordResetPinMigration.constants";

describe("password reset PIN database rule", () => {
  const migration = readFileSync(
    MIGRATION_PATH,
    MIGRATION_ENCODING
  ).replace(WHITESPACE_RUN, SINGLE_SPACE);

  it("embeds the same PIN length as the application", () => {
    const match = SQL_PIN_LENGTH_FUNCTION.exec(migration);

    expect(match).not.toBeNull();
    expect(Number(match?.[SQL_PIN_LENGTH_GROUP])).toBe(
      PASSWORD_RESET_PIN.LENGTH
    );
  });
});

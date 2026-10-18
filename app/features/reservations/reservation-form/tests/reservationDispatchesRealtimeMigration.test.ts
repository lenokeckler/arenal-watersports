import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const DISPATCH_REALTIME_MIGRATION = path.resolve(
  process.cwd(),
  "supabase/migrations/20261018120300_reservation_dispatches_realtime.sql"
);

describe("reservation dispatches realtime migration", () => {
  it("publishes dispatch changes without altering other tables or RLS", () => {
    const migration = readFileSync(
      DISPATCH_REALTIME_MIGRATION,
      "utf8"
    );

    expect(migration).toBe(
      "alter publication supabase_realtime add table reservation_dispatches;\n"
    );
  });
});

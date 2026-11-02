import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listProductionSources } from "@/app/services/supabase/tests/listProductionSources";
import {
  APP_DIRECTORY,
  TEXT_ENCODING,
} from "@/app/services/supabase/tests/serviceRoleBoundary.constants";
import {
  NODEMAILER_ALLOWED_FILES,
  NODEMAILER_REFERENCE_PATTERN,
} from "./nodemailerBoundary.constants";

describe("nodemailer boundary", () => {
  it("imports nodemailer from exactly one file", () => {
    const importers = listProductionSources().filter(
      (file) =>
        NODEMAILER_REFERENCE_PATTERN.test(
          readFileSync(
            path.join(APP_DIRECTORY, file),
            TEXT_ENCODING
          )
        )
    );

    expect(importers).toEqual(NODEMAILER_ALLOWED_FILES);
  });
});

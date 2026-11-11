import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { listProductionSources } from "@/app/services/supabase/tests/listProductionSources";
import {
  APP_DIRECTORY,
  CLIENT_DIRECTIVE_PATTERN,
  SOURCE_SCAN_TEST_TIMEOUT_MS,
  CLIENT_SIDE_PATH_PATTERN,
  TEXT_ENCODING,
} from "@/app/services/supabase/tests/serviceRoleBoundary.constants";
import { REQUEST_SERVICE_IMPORT_PATTERN } from "./requestBoundary.constants";

const readSource = (file: string): string =>
  readFileSync(
    path.join(APP_DIRECTORY, file),
    TEXT_ENCODING
  );

vi.setConfig({ testTimeout: SOURCE_SCAN_TEST_TIMEOUT_MS });

describe("request service boundary", () => {
  it("never imports the request service from a client module", () => {
    const offenders = listProductionSources().filter(
      (file) => {
        const source = readSource(file);

        return (
          (CLIENT_SIDE_PATH_PATTERN.test(file) ||
            CLIENT_DIRECTIVE_PATTERN.test(source)) &&
          REQUEST_SERVICE_IMPORT_PATTERN.test(source)
        );
      }
    );

    expect(offenders).toEqual([]);
  });
});

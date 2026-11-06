import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listProductionSources } from "@/app/services/supabase/tests/listProductionSources";
import {
  APP_DIRECTORY,
  TEXT_ENCODING,
} from "@/app/services/supabase/tests/serviceRoleBoundary.constants";
import {
  NETWORK_SECRET_ALLOWED_PATH_PATTERN,
  NETWORK_SECRET_NAME_PATTERN,
  NEXT_HEADERS_ALLOWED_FILE,
  NEXT_HEADERS_IMPORT_PATTERN,
  REQUEST_SERVICE_PATH_PATTERN,
} from "./networkKeyBoundary.constants";

const readSource = (file: string): string =>
  readFileSync(
    path.join(APP_DIRECTORY, file),
    TEXT_ENCODING
  );

describe("network key boundary", () => {
  it("names the secret only under app/constants/request", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        !NETWORK_SECRET_ALLOWED_PATH_PATTERN.test(file) &&
        NETWORK_SECRET_NAME_PATTERN.test(readSource(file))
    );

    expect(offenders).toEqual([]);
  });

  it("imports next/headers only from readClientNetworkKey", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        REQUEST_SERVICE_PATH_PATTERN.test(file) &&
        file !== NEXT_HEADERS_ALLOWED_FILE &&
        NEXT_HEADERS_IMPORT_PATTERN.test(readSource(file))
    );

    expect(offenders).toEqual([]);
  });

  it("reads next/headers in readClientNetworkKey", () => {
    expect(
      NEXT_HEADERS_IMPORT_PATTERN.test(
        readSource(NEXT_HEADERS_ALLOWED_FILE)
      )
    ).toBe(true);
  });
});

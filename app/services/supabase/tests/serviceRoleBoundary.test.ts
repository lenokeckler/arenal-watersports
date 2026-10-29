import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listProductionSources } from "./listProductionSources";
import {
  APP_DIRECTORY,
  CLIENT_DIRECTIVE_PATTERN,
  CLIENT_SIDE_PATH_PATTERN,
  SERVICE_ROLE_KEY_ALLOWED_FILES,
  SERVICE_ROLE_KEY_PATTERN,
  SERVICE_ROLE_REFERENCE_PATTERN,
  SET_WORKER_PASSWORD_ALLOWED_PATH_PATTERN,
  SET_WORKER_PASSWORD_PATTERN,
  SERVICES_BARREL_IMPORT_PATTERN,
  SERVICES_PATH_PATTERN,
  TEXT_ENCODING,
} from "./serviceRoleBoundary.constants";

const readSource = (file: string): string =>
  readFileSync(
    path.join(APP_DIRECTORY, file),
    TEXT_ENCODING
  );

describe("service role boundary", () => {
  it("references the service role client only from app/services", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        !SERVICES_PATH_PATTERN.test(file) &&
        SERVICE_ROLE_REFERENCE_PATTERN.test(
          readSource(file)
        )
    );

    expect(offenders).toEqual([]);
  });

  it("reads the service role key only where it is declared", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        !SERVICE_ROLE_KEY_ALLOWED_FILES.includes(file) &&
        SERVICE_ROLE_KEY_PATTERN.test(readSource(file))
    );

    expect(offenders).toEqual([]);
  });

  it("never imports a services barrel from a client module", () => {
    const offenders = listProductionSources().filter(
      (file) => {
        const source = readSource(file);

        return (
          (CLIENT_SIDE_PATH_PATTERN.test(file) ||
            CLIENT_DIRECTIVE_PATTERN.test(source)) &&
          SERVICES_BARREL_IMPORT_PATTERN.test(source)
        );
      }
    );

    expect(offenders).toEqual([]);
  });

  it("references setWorkerPassword only from authentication and password recovery services", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        !SET_WORKER_PASSWORD_ALLOWED_PATH_PATTERN.test(
          file
        ) &&
        SET_WORKER_PASSWORD_PATTERN.test(readSource(file))
    );

    expect(offenders).toEqual([]);
  });
});

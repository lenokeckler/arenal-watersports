import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { listProductionSources } from "@/app/services/supabase/tests/listProductionSources";
import {
  APP_DIRECTORY,
  CLIENT_DIRECTIVE_PATTERN,
  CLIENT_SIDE_PATH_PATTERN,
  TEXT_ENCODING,
} from "@/app/services/supabase/tests/serviceRoleBoundary.constants";
import {
  MAIL_BARREL_IMPORT_PATTERN,
  MAIL_ENVIRONMENT_ALLOWED_PATH_PATTERN,
  MAIL_ENVIRONMENT_NAME_PATTERN,
} from "./mailBoundary.constants";

const readSource = (file: string): string =>
  readFileSync(
    path.join(APP_DIRECTORY, file),
    TEXT_ENCODING
  );

describe("mail boundary", () => {
  it("reads the mail environment names only under app/constants/mail", () => {
    const offenders = listProductionSources().filter(
      (file) =>
        !MAIL_ENVIRONMENT_ALLOWED_PATH_PATTERN.test(file) &&
        MAIL_ENVIRONMENT_NAME_PATTERN.test(readSource(file))
    );

    expect(offenders).toEqual([]);
  });

  it("never imports the mail barrel from a client module", () => {
    const offenders = listProductionSources().filter(
      (file) => {
        const source = readSource(file);

        return (
          (CLIENT_SIDE_PATH_PATTERN.test(file) ||
            CLIENT_DIRECTIVE_PATTERN.test(source)) &&
          MAIL_BARREL_IMPORT_PATTERN.test(source)
        );
      }
    );

    expect(offenders).toEqual([]);
  });
});

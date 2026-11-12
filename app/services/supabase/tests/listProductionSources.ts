import { readdirSync } from "node:fs";
import path from "node:path";
import {
  APP_DIRECTORY,
  SOURCE_FILE_PATTERN,
  TEXT_ENCODING,
  TEST_PATH_PATTERN,
} from "./serviceRoleBoundary.constants";

const POSIX_SEPARATOR = "/";

export const listProductionSources = (): string[] =>
  readdirSync(APP_DIRECTORY, {
    recursive: true,
    encoding: TEXT_ENCODING,
  })
    .map((file) =>
      file.split(path.sep).join(POSIX_SEPARATOR)
    )
    .filter(
      (file) =>
        SOURCE_FILE_PATTERN.test(file) &&
        !TEST_PATH_PATTERN.test(file)
    );

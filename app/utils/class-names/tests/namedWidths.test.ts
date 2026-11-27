import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import {
  NAMED_WIDTH_PATTERN,
  SOURCE_FILE_PATTERN,
  SOURCE_ROOT,
  SOURCE_SCAN_TIMEOUT_MS,
} from "./namedWidths.constants";

const listSources = (folder: string): string[] =>
  readdirSync(folder, { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(folder, entry.name);

      if (entry.isDirectory()) {
        return entry.name === "tests"
          ? []
          : listSources(path);
      }

      return SOURCE_FILE_PATTERN.test(entry.name)
        ? [path]
        : [];
    }
  );

describe("named width utilities", () => {
  it(
    "are not used: the spacing tokens turn them into a few pixels",
    () => {
      const offenders = listSources(
        join(process.cwd(), SOURCE_ROOT)
      )
        .filter((path) =>
          NAMED_WIDTH_PATTERN.test(
            readFileSync(path, "utf8")
          )
        )
        .map((path) =>
          relative(process.cwd(), path).split(sep).join("/")
        );

      expect(offenders).toEqual([]);
    },
    SOURCE_SCAN_TIMEOUT_MS
  );
});

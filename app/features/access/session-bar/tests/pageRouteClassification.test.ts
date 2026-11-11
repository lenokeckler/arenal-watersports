import { readdirSync } from "node:fs";
import { basename, dirname, sep } from "node:path";
import { describe, expect, it } from "vitest";
import {
  APP_ROOT_DIRECTORY,
  CLASSIFIED_PAGE_ROUTES,
  CURRENT_DIRECTORY_SEGMENT,
  PAGE_FILE_NAME,
  ROUTE_GROUP_PATTERN,
  ROUTE_SEPARATOR,
} from "./RouteScan.constants";

const toRoute = (pageFile: string): string =>
  ROUTE_SEPARATOR +
  dirname(pageFile)
    .split(sep)
    .filter(
      (segment) =>
        segment !== CURRENT_DIRECTORY_SEGMENT &&
        !ROUTE_GROUP_PATTERN.test(segment)
    )
    .join(ROUTE_SEPARATOR);

const listPageRoutes = (): string[] =>
  readdirSync(APP_ROOT_DIRECTORY, { recursive: true })
    .map(String)
    .filter((file) => basename(file) === PAGE_FILE_NAME)
    .map(toRoute)
    .sort();

describe("page route classification", () => {
  it("places every page under app in exactly one of the system, pre-login or excluded lists", () => {
    expect(listPageRoutes()).toEqual(
      [...CLASSIFIED_PAGE_ROUTES].sort()
    );
  });

  it("lists no route twice across the classified lists", () => {
    expect(new Set(CLASSIFIED_PAGE_ROUTES).size).toBe(
      CLASSIFIED_PAGE_ROUTES.length
    );
  });
});

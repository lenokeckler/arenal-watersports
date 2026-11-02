import { readdirSync } from "node:fs";
import { basename, sep } from "node:path";
import { describe, expect, it } from "vitest";
import {
  APP_DIRECTORY,
  LOGOUT_PATH_SEGMENT,
  LOGOUT_ROUTE_FILE_NAME,
} from "./SessionBarView.constants";

const findLogoutRouteHandlers = (): string[] =>
  readdirSync(APP_DIRECTORY, { recursive: true })
    .map(String)
    .filter(
      (path) =>
        basename(path) === LOGOUT_ROUTE_FILE_NAME &&
        path
          .split(sep)
          .some((segment) =>
            LOGOUT_PATH_SEGMENT.test(segment)
          )
    );

describe("sign-out transport", () => {
  it("has no route handler for a logout path", () => {
    expect(findLogoutRouteHandlers()).toEqual([]);
  });
});

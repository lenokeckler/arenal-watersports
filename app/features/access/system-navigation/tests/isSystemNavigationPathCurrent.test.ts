import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { isSystemNavigationPathCurrent } from "../utils/isSystemNavigationPathCurrent";

const TARIFF_DETAIL_PATH = `${PATHS.ADMINISTRATION.TARIFFS}/kayak`;

describe("isSystemNavigationPathCurrent", () => {
  it.each([
    [
      PATHS.ADMINISTRATION.TARIFFS,
      PATHS.ADMINISTRATION.TARIFFS,
      true,
    ],
    [
      PATHS.ADMINISTRATION.TARIFFS,
      TARIFF_DETAIL_PATH,
      true,
    ],
    [PATHS.BOARD, PATHS.HOME, true],
    [
      PATHS.ADMINISTRATION.COMBOS,
      PATHS.ADMINISTRATION.TARIFFS,
      false,
    ],
    [PATHS.PROFILE.ROOT, PATHS.BOARD, false],
  ])("marks %s on %s as %s", (href, pathname, expected) => {
    expect(
      isSystemNavigationPathCurrent(href, pathname)
    ).toBe(expected);
  });
});

import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import {
  resolveCategoryUnitsPath,
  resolveUnitEditPath,
  resolveUnitNewPath,
} from "../utils/resolveUnitPaths";
import {
  FAKE_CATEGORY_ID,
  FAKE_UNIT_ID,
} from "./Unit.constants";

const UNITS_PATH = `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_UNITS_SEGMENT}`;

describe("resolveUnitPaths", () => {
  it("puts the category id between the list path and the units segment", () => {
    expect(resolveCategoryUnitsPath(FAKE_CATEGORY_ID)).toBe(
      UNITS_PATH
    );
  });

  it("appends the new segment to the units path", () => {
    expect(resolveUnitNewPath(FAKE_CATEGORY_ID)).toBe(
      `${UNITS_PATH}/${PATHS.ADMINISTRATION.UNITS_NEW_SEGMENT}`
    );
  });

  it("appends the unit id to the units path", () => {
    expect(
      resolveUnitEditPath(FAKE_CATEGORY_ID, FAKE_UNIT_ID)
    ).toBe(`${UNITS_PATH}/${FAKE_UNIT_ID}`);
  });
});

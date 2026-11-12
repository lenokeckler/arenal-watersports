import { describe, expect, it } from "vitest";
import { parseCategoryImagePath } from "../parseCategoryImagePath";
import {
  CATEGORY_ID,
  INVALID_IMAGE_PATHS,
  NON_PATH_INPUTS,
  VALID_IMAGE_PATH,
} from "./categoryImage.constants";

describe("parseCategoryImagePath", () => {
  it("accepts a path under its own category", () => {
    expect(
      parseCategoryImagePath(VALID_IMAGE_PATH, CATEGORY_ID)
    ).toBe(VALID_IMAGE_PATH);
  });

  it.each(NON_PATH_INPUTS)(
    "rejects the non-string input %j",
    (input) => {
      expect(
        parseCategoryImagePath(input, CATEGORY_ID)
      ).toBeNull();
    }
  );

  it.each(INVALID_IMAGE_PATHS)(
    "rejects the path %s",
    (path) => {
      expect(
        parseCategoryImagePath(path, CATEGORY_ID)
      ).toBeNull();
    }
  );

  it("rejects a category id that is not a uuid", () => {
    expect(
      parseCategoryImagePath(
        VALID_IMAGE_PATH,
        CATEGORY_ID.slice(1)
      )
    ).toBeNull();
  });
});

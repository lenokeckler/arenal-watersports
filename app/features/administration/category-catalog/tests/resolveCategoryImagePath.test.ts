import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryImagePath } from "../utils/resolveCategoryImagePath";
import { IMAGE_CATEGORY_ID } from "./CategoryImage.constants";

describe("resolveCategoryImagePath", () => {
  it("places the category id between the list path and the image segment", () => {
    expect(
      resolveCategoryImagePath(IMAGE_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${IMAGE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_IMAGE_SEGMENT}`
    );
  });
});

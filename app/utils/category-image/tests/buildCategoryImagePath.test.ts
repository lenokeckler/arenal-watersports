import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_MIME_TYPE } from "@/app/constants";
import { buildCategoryImagePath } from "../buildCategoryImagePath";
import { parseCategoryImagePath } from "../parseCategoryImagePath";
import {
  CATEGORY_ID,
  EXPECTED_EXTENSION_BY_MIME,
  OBJECT_ID,
  VALID_IMAGE_PATH,
} from "./categoryImage.constants";

describe("buildCategoryImagePath", () => {
  it.each(EXPECTED_EXTENSION_BY_MIME)(
    "uses the extension of %s",
    (mimeType, extension) => {
      expect(
        buildCategoryImagePath({
          categoryId: CATEGORY_ID,
          mimeType,
          objectId: OBJECT_ID,
        })
      ).toBe(`${CATEGORY_ID}/${OBJECT_ID}.${extension}`);
    }
  );

  it("builds a path the parser accepts", () => {
    const path = buildCategoryImagePath({
      categoryId: CATEGORY_ID,
      mimeType: CATEGORY_IMAGE_MIME_TYPE.WEBP,
      objectId: OBJECT_ID,
    });

    expect(path).toBe(VALID_IMAGE_PATH);
    expect(parseCategoryImagePath(path, CATEGORY_ID)).toBe(
      path
    );
  });
});

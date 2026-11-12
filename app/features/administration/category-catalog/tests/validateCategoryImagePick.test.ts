import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_FILE_ISSUE } from "@/app/constants";
import { validateCategoryImagePick } from "../utils/validateCategoryImagePick";
import {
  buildImageFile,
  OBJECT_SIZE_ABOVE_MAX_BYTES,
  UNSUPPORTED_OBJECT_TYPE,
} from "./CategoryImage.constants";

describe("validateCategoryImagePick", () => {
  it("accepts a supported image", () => {
    expect(
      validateCategoryImagePick(buildImageFile())
    ).toBeNull();
  });

  it("accepts a photo above the upload limit because it is compressed first", () => {
    expect(
      validateCategoryImagePick(
        buildImageFile({
          size: OBJECT_SIZE_ABOVE_MAX_BYTES,
        })
      )
    ).toBeNull();
  });

  it("rejects an empty file", () => {
    expect(
      validateCategoryImagePick(buildImageFile({ size: 0 }))
    ).toBe(CATEGORY_IMAGE_FILE_ISSUE.EMPTY);
  });

  it("rejects a file that is not a supported image", () => {
    expect(
      validateCategoryImagePick(
        buildImageFile({ type: UNSUPPORTED_OBJECT_TYPE })
      )
    ).toBe(CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE);
  });
});

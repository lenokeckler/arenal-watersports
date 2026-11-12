import { describe, expect, it } from "vitest";
import {
  CATEGORY_IMAGE,
  CATEGORY_IMAGE_FILE_ISSUE,
  CATEGORY_IMAGE_MIME_TYPE,
} from "@/app/constants";
import { validateCategoryImageFile } from "../validateCategoryImageFile";
import {
  ALLOWED_FILE_SIZE_BYTES,
  FILE_SIZE_ABOVE_MAX_BYTES,
  UNSUPPORTED_MIME_TYPE,
} from "./categoryImage.constants";

describe("validateCategoryImageFile", () => {
  it("rejects an empty file", () => {
    expect(
      validateCategoryImageFile({
        size: 0,
        type: CATEGORY_IMAGE_MIME_TYPE.PNG,
      })
    ).toBe(CATEGORY_IMAGE_FILE_ISSUE.EMPTY);
  });

  it("accepts a file exactly at the size limit", () => {
    expect(
      validateCategoryImageFile({
        size: CATEGORY_IMAGE.MAX_FILE_SIZE_BYTES,
        type: CATEGORY_IMAGE_MIME_TYPE.WEBP,
      })
    ).toBeNull();
  });

  it("rejects a file one byte above the size limit", () => {
    expect(
      validateCategoryImageFile({
        size: FILE_SIZE_ABOVE_MAX_BYTES,
        type: CATEGORY_IMAGE_MIME_TYPE.WEBP,
      })
    ).toBe(CATEGORY_IMAGE_FILE_ISSUE.TOO_LARGE);
  });

  it("rejects a type the bucket does not allow", () => {
    expect(
      validateCategoryImageFile({
        size: ALLOWED_FILE_SIZE_BYTES,
        type: UNSUPPORTED_MIME_TYPE,
      })
    ).toBe(CATEGORY_IMAGE_FILE_ISSUE.UNSUPPORTED_TYPE);
  });

  it.each(CATEGORY_IMAGE.MIME_TYPES)(
    "accepts %s",
    (mimeType) => {
      expect(
        validateCategoryImageFile({
          size: ALLOWED_FILE_SIZE_BYTES,
          type: mimeType,
        })
      ).toBeNull();
    }
  );
});

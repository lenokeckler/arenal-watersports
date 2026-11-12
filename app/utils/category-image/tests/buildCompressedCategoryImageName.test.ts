import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_MIME_TYPE } from "@/app/constants";
import { buildCompressedCategoryImageName } from "../buildCompressedCategoryImageName";
import {
  HIDDEN_FILE_NAME,
  NAME_WITHOUT_EXTENSION,
  SOURCE_FILE_NAME,
} from "./categoryImageCompression.constants";

describe("buildCompressedCategoryImageName", () => {
  it("replaces only the last extension with the one of the mime type", () => {
    expect(
      buildCompressedCategoryImageName(
        SOURCE_FILE_NAME,
        CATEGORY_IMAGE_MIME_TYPE.WEBP
      )
    ).toBe("boat.photo.webp");
  });

  it("uses jpg for the jpeg mime type", () => {
    expect(
      buildCompressedCategoryImageName(
        SOURCE_FILE_NAME,
        CATEGORY_IMAGE_MIME_TYPE.JPEG
      )
    ).toBe("boat.photo.jpg");
  });

  it("appends the extension when the name has none", () => {
    expect(
      buildCompressedCategoryImageName(
        NAME_WITHOUT_EXTENSION,
        CATEGORY_IMAGE_MIME_TYPE.WEBP
      )
    ).toBe("boat.webp");
  });

  it("keeps a leading dot as part of the base name", () => {
    expect(
      buildCompressedCategoryImageName(
        HIDDEN_FILE_NAME,
        CATEGORY_IMAGE_MIME_TYPE.WEBP
      )
    ).toBe(".boat.webp");
  });
});

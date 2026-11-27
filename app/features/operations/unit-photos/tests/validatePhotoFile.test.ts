import { describe, expect, it } from "vitest";
import { UNIT_PHOTOS_COPY } from "../constants/UnitPhotosCopy.constants";
import { validatePhotoFile } from "../utils/validatePhotoFile";

describe("validatePhotoFile", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])(
    "accepts %s",
    (type) => {
      expect(
        validatePhotoFile({ size: 1024, type })
      ).toBeNull();
    }
  );

  it("refuses a type that is not an image the bucket allows", () => {
    expect(
      validatePhotoFile({ size: 1024, type: "image/gif" })
    ).toBe(UNIT_PHOTOS_COPY.ERROR_TYPE);
  });

  it("refuses a photo over 5 MB and accepts exactly 5 MB", () => {
    expect(
      validatePhotoFile({
        size: 5_242_881,
        type: "image/jpeg",
      })
    ).toBe(UNIT_PHOTOS_COPY.ERROR_SIZE);
    expect(
      validatePhotoFile({
        size: 5_242_880,
        type: "image/jpeg",
      })
    ).toBeNull();
  });
});

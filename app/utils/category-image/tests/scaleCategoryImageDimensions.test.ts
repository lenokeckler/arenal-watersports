import { describe, expect, it } from "vitest";
import { CATEGORY_IMAGE_COMPRESSION } from "@/app/constants";
import { scaleCategoryImageDimensions } from "../scaleCategoryImageDimensions";
import {
  LANDSCAPE_DIMENSIONS,
  PORTRAIT_DIMENSIONS,
  SMALL_DIMENSIONS,
  THIN_DIMENSIONS,
} from "./categoryImageCompression.constants";

describe("scaleCategoryImageDimensions", () => {
  it("scales a landscape image so its width is the max side", () => {
    const scaled = scaleCategoryImageDimensions(
      LANDSCAPE_DIMENSIONS
    );

    expect(scaled.width).toBe(
      CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX
    );
    expect(scaled.height).toBe(
      Math.round(
        (LANDSCAPE_DIMENSIONS.height *
          CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX) /
          LANDSCAPE_DIMENSIONS.width
      )
    );
  });

  it("scales a portrait image so its height is the max side", () => {
    const scaled = scaleCategoryImageDimensions(
      PORTRAIT_DIMENSIONS
    );

    expect(scaled.height).toBe(
      CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX
    );
    expect(scaled.width).toBeLessThan(
      PORTRAIT_DIMENSIONS.width
    );
  });

  it("never scales an image up", () => {
    expect(
      scaleCategoryImageDimensions(SMALL_DIMENSIONS)
    ).toEqual(SMALL_DIMENSIONS);
  });

  it("keeps the shorter side at the minimum side", () => {
    const scaled =
      scaleCategoryImageDimensions(THIN_DIMENSIONS);

    expect(scaled.height).toBe(
      CATEGORY_IMAGE_COMPRESSION.MIN_SIDE_PX
    );
    expect(scaled.width).toBe(
      CATEGORY_IMAGE_COMPRESSION.MAX_SIDE_PX
    );
  });
});

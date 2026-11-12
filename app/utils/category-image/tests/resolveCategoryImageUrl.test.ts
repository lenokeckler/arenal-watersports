import { describe, expect, it } from "vitest";
import { SUPABASE } from "@/app/constants";
import { resolveCategoryImageUrl } from "../resolveCategoryImageUrl";
import { VALID_IMAGE_PATH } from "./categoryImage.constants";

describe("resolveCategoryImageUrl", () => {
  it("returns the public object url of the path", () => {
    expect(resolveCategoryImageUrl(VALID_IMAGE_PATH)).toBe(
      `${SUPABASE.URL}/storage/v1/object/public/category-images/${VALID_IMAGE_PATH}`
    );
  });

  it("returns null when the category has no image", () => {
    expect(resolveCategoryImageUrl(null)).toBeNull();
  });
});

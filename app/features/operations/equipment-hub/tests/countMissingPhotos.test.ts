import { describe, expect, it } from "vitest";
import { UNIT_PHOTO_BASIC_ANGLES } from "@/app/constants";
import type { PhotoUnit } from "@/app/services/equipment/models/PhotoUnit.interface";
import { countMissingPhotos } from "../utils/countMissingPhotos";

describe("countMissingPhotos", () => {
  it("counts the machines short of a basic photo", () => {
    const complete = UNIT_PHOTO_BASIC_ANGLES.length;

    expect(
      countMissingPhotos([
        { basicCount: complete } as PhotoUnit,
        { basicCount: complete - 1 } as PhotoUnit,
      ])
    ).toBe(1);
  });
});

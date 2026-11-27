import { describe, expect, it } from "vitest";
import { buildPhotoSlots } from "../utils/buildPhotoSlots";
import { PHOTO_URL } from "./UnitPhotos.constants";

describe("buildPhotoSlots", () => {
  it("keeps the order of the angles and leaves the missing ones empty", () => {
    const slots = buildPhotoSlots(
      [{ angle: "front", storage_path: "u/front" }],
      new Map([["u/front", PHOTO_URL]])
    );

    expect(slots.map((slot) => slot.angle)).toEqual([
      "right_side",
      "left_side",
      "front",
      "back",
      "bottom",
      "extra",
    ]);
    expect(slots.map((slot) => slot.url)).toEqual([
      null,
      null,
      PHOTO_URL,
      null,
      null,
      null,
    ]);
  });

  it("leaves a slot empty when its url could not be signed", () => {
    const slots = buildPhotoSlots(
      [{ angle: "front", storage_path: "u/front" }],
      new Map()
    );

    expect(slots[2].url).toBeNull();
  });
});

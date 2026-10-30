import { describe, expect, it } from "vitest";
import { resolveReservationEquipmentImage } from "../utils/resolveReservationEquipmentImage";

describe("resolveReservationEquipmentImage", () => {
  it.each([
    ["Jet Ski", "/images/equipment/jet-ski.webp"],
    ["Kayak Doble", "/images/equipment/kayak-doble.webp"],
    ["SUP Board", "/images/equipment/paddleboard.webp"],
  ])(
    "resolves the image for %s",
    (categoryName, source) => {
      expect(
        resolveReservationEquipmentImage(categoryName)
          ?.source
      ).toBe(source);
    }
  );

  it("returns no image for an unsupported category", () => {
    expect(
      resolveReservationEquipmentImage("Lancha")
    ).toBeNull();
  });
});

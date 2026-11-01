import { describe, expect, it } from "vitest";
import { resolveReservationEquipmentImage } from "../utils/resolveReservationEquipmentImage";

describe("resolveReservationEquipmentImage", () => {
  it.each([
    ["Jet Ski", "/images/equipment/jet-ski.webp"],
    ["Kayak Doble", "/images/equipment/kayak-doble.webp"],
    [
      "Kayak individual",
      "/images/equipment/kayak-individual.webp",
    ],
    ["Lancha", "/images/equipment/lancha.webp"],
    ["Cuadraciclo", "/images/equipment/cuadraciclo.webp"],
    [
      "  S\u00daP Board  ",
      "/images/equipment/paddleboard.webp",
    ],
  ])(
    "resolves the image for %s",
    (categoryName, source) => {
      expect(
        resolveReservationEquipmentImage(categoryName)
          ?.source
      ).toBe(source);
    }
  );

  it.each([
    "Super category",
    "Kayak accessory",
    "constructor",
    "__proto__",
  ])(
    "returns no image for unsupported category %s",
    (categoryName) => {
      expect(
        resolveReservationEquipmentImage(categoryName)
      ).toBeNull();
    }
  );
});

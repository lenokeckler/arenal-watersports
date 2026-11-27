import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import { resolvePhotoSummary } from "../utils/resolvePhotoSummary";
import { resolveReservationsSummary } from "../utils/resolveReservationsSummary";
import { resolveStockSummary } from "../utils/resolveStockSummary";
import { DEFAULT_CATEGORY_CONFIGURATION } from "./CategoryConfiguration.constants";

const { behavior, image } = DEFAULT_CATEGORY_CONFIGURATION;
const SINGLE_UNIT = 1;
const NO_UNITS = 0;
const SEVERAL_UNITS = 8;
const NO_PICKED_PHOTO = false;
const PICKED_PHOTO = true;

describe("resolveReservationsSummary", () => {
  it.each([
    {
      scenario: "a reservable category with a duration",
      input: behavior,
      expected: "Reservable · 60 min",
    },
    {
      scenario: "a guide only category",
      input: { ...behavior, guideOnly: true },
      expected: "Reservable · 60 min · Solo con guía",
    },
    {
      scenario: "a reservable category without a duration",
      input: { ...behavior, defaultDurationMinutes: null },
      expected: "Reservable",
    },
    {
      scenario: "an internal category",
      input: { ...behavior, isReservable: false },
      expected:
        CATEGORY_CONFIGURE_COPY.RESERVATIONS_NOT_RESERVABLE,
    },
  ])("$scenario", ({ input, expected }) => {
    expect(resolveReservationsSummary(input)).toBe(
      expected
    );
  });
});

describe("resolveStockSummary", () => {
  it.each([
    { quantity: NO_UNITS, expected: "0 unidades" },
    { quantity: SINGLE_UNIT, expected: "1 unidad" },
    { quantity: SEVERAL_UNITS, expected: "8 unidades" },
  ])("$quantity units", ({ quantity, expected }) => {
    expect(resolveStockSummary(quantity)).toBe(expected);
  });
});

describe("resolvePhotoSummary", () => {
  it("says the photo is there when one is saved", () => {
    expect(
      resolvePhotoSummary(image, NO_PICKED_PHOTO)
    ).toBe(CATEGORY_CONFIGURE_COPY.PHOTO_PRESENT);
  });

  it("says the placeholder is used when there is none", () => {
    expect(
      resolvePhotoSummary(
        { ...image, imagePath: null },
        NO_PICKED_PHOTO
      )
    ).toBe(CATEGORY_CONFIGURE_COPY.PHOTO_MISSING);
  });

  it("names the new photo as soon as one is picked", () => {
    expect(
      resolvePhotoSummary(
        { ...image, imagePath: null },
        PICKED_PHOTO
      )
    ).toBe(CATEGORY_CONFIGURE_COPY.PHOTO_PICKED);
  });
});

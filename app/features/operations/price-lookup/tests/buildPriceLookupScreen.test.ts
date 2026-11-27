import { describe, expect, it } from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import { PRICE_LOOKUP_AUDIENCE } from "../constants/PriceLookupAudience.constants";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import type { PriceLookupAudience } from "../models/PriceLookupAudience.type";
import { buildPriceLookupScreen } from "../utils/buildPriceLookupScreen";
import {
  BOAT_TARIFF,
  COMBO_ITEMS_TEXT,
  EMPTY_CATALOG,
  FOREIGN_COMBO,
  formatCrc,
  formatUsd,
  FULL_CATALOG,
  JET_SKI_RENTAL_CRC,
  JET_SKI_RENTAL_USD,
  JET_SKI_TARIFF,
  JET_SKI_TOUR_USD,
  NATIONAL_COMBO,
  NATIONAL_COMBO_CRC,
  PARRILLA_CRC,
  PARRILLA_USD,
  TUBING_USD,
} from "./PriceLookup.constants";

const findSection = (audience: PriceLookupAudience) =>
  buildPriceLookupScreen(FULL_CATALOG).sections.find(
    (section) => section.audience === audience
  );

describe("buildPriceLookupScreen tariffs", () => {
  it("lists one card per category with a tariff, rental then tour", () => {
    const { tariffCards } =
      buildPriceLookupScreen(FULL_CATALOG);

    expect(tariffCards.map((card) => card.title)).toEqual([
      JET_SKI_TARIFF.categoryName,
    ]);
    expect(
      tariffCards.flatMap((card) =>
        card.rows.map((row) => row.label)
      )
    ).toEqual([
      PRICE_LOOKUP_COPY.RENTAL_LABEL,
      PRICE_LOOKUP_COPY.TOUR_LABEL,
    ]);
  });

  it("shows each currency of a tariff on its own line, never added together", () => {
    const { tariffCards } =
      buildPriceLookupScreen(FULL_CATALOG);
    const [rentalRow, tourRow] = tariffCards.flatMap(
      (card) => card.rows
    );

    expect(rentalRow.amounts).toEqual([
      {
        currencyName: CURRENCY_NAME_COPY.USD,
        text: formatUsd(JET_SKI_RENTAL_USD),
      },
      {
        currencyName: CURRENCY_NAME_COPY.CRC,
        text: formatCrc(JET_SKI_RENTAL_CRC),
      },
    ]);
    expect(tourRow.amounts).toEqual([
      {
        currencyName: CURRENCY_NAME_COPY.USD,
        text: formatUsd(JET_SKI_TOUR_USD),
      },
    ]);
  });

  it("leaves the amounts empty for a type without a tariff", () => {
    const { tariffCards } = buildPriceLookupScreen({
      ...EMPTY_CATALOG,
      tariffs: [
        { ...JET_SKI_TARIFF, tour: null },
        BOAT_TARIFF,
      ],
    });

    expect(
      tariffCards.flatMap((card) =>
        card.rows
          .filter((row) => row.amounts.length === 0)
          .map((row) => row.label)
      )
    ).toEqual([PRICE_LOOKUP_COPY.TOUR_LABEL]);
  });
});

describe("buildPriceLookupScreen audience sections", () => {
  it("puts the nationals first and prices their extras in colones only", () => {
    const national = findSection(
      PRICE_LOOKUP_AUDIENCE.NATIONAL
    );

    expect(national?.heading).toBe(
      PRICE_LOOKUP_COPY.NATIONAL_HEADING
    );
    expect(
      national?.extras.map((row) => row.amounts)
    ).toEqual([
      [
        {
          currencyName: CURRENCY_NAME_COPY.CRC,
          text: formatCrc(PARRILLA_CRC),
        },
      ],
    ]);
  });

  it("prices the foreigners' extras in dollars only, including those with no colones price", () => {
    const foreign = findSection(
      PRICE_LOOKUP_AUDIENCE.FOREIGN
    );

    expect(foreign?.heading).toBe(
      PRICE_LOOKUP_COPY.FOREIGN_HEADING
    );
    expect(
      foreign?.extras.flatMap((row) =>
        row.amounts.map((line) => line.text)
      )
    ).toEqual([
      formatUsd(PARRILLA_USD),
      formatUsd(TUBING_USD),
    ]);
  });

  it("files each combo in the section of its audience with its package price and contents", () => {
    const national = findSection(
      PRICE_LOOKUP_AUDIENCE.NATIONAL
    );
    const foreign = findSection(
      PRICE_LOOKUP_AUDIENCE.FOREIGN
    );

    expect(national?.combos).toEqual([
      {
        amounts: [
          {
            currencyName: CURRENCY_NAME_COPY.CRC,
            text: formatCrc(NATIONAL_COMBO_CRC),
          },
        ],
        detail: COMBO_ITEMS_TEXT,
        id: NATIONAL_COMBO.id,
        label: NATIONAL_COMBO.name,
      },
    ]);
    expect(foreign?.combos.map((row) => row.id)).toEqual([
      FOREIGN_COMBO.id,
    ]);
  });

  it("skips a combo that has no package price", () => {
    const { sections } = buildPriceLookupScreen({
      ...EMPTY_CATALOG,
      combos: [{ ...NATIONAL_COMBO, packagePrice: null }],
    });

    expect(
      sections.flatMap((section) => section.combos)
    ).toEqual([]);
  });
});

describe("buildPriceLookupScreen emptiness", () => {
  it("is empty when nothing is priced", () => {
    expect(
      buildPriceLookupScreen(EMPTY_CATALOG).isEmpty
    ).toBe(true);
  });

  it("is not empty when only a tariff is priced", () => {
    expect(
      buildPriceLookupScreen({
        ...EMPTY_CATALOG,
        tariffs: [JET_SKI_TARIFF],
      }).isEmpty
    ).toBe(false);
  });

  it("is not empty when only a combo is priced", () => {
    expect(
      buildPriceLookupScreen({
        ...EMPTY_CATALOG,
        combos: [NATIONAL_COMBO],
      }).isEmpty
    ).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { TARIFF_CARD_TONE } from "../constants/TariffCardTone.constants";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { buildTariffCardViewModel } from "../utils/buildTariffCardViewModel";
import {
  buildCatalogRow,
  DEFAULT_CATALOG_ROW,
  FAKE_CATEGORY_ID,
  FAKE_CATEGORY_NAME,
  FORMATTED_BOTH_AMOUNTS,
  FORMATTED_TOUR_USD,
} from "./TariffCatalog.constants";

describe("buildTariffCardViewModel", () => {
  it("builds the rental line first and the tour line second with the unit", () => {
    expect(
      buildTariffCardViewModel(DEFAULT_CATALOG_ROW)
    ).toEqual({
      id: FAKE_CATEGORY_ID,
      lines: [
        {
          amounts: FORMATTED_BOTH_AMOUNTS,
          label: TARIFF_CATALOG_COPY.TYPE_LABEL_RENTAL,
          unit: TARIFF_CATALOG_COPY.UNIT_PER_HOUR,
        },
        {
          amounts: FORMATTED_TOUR_USD,
          label: TARIFF_CATALOG_COPY.TYPE_LABEL_TOUR,
          unit: TARIFF_CATALOG_COPY.UNIT_PER_HOUR,
        },
      ],
      name: FAKE_CATEGORY_NAME,
      tone: TARIFF_CARD_TONE.STANDARD,
    });
  });

  it("shows no tariff without the unit on the line that has none", () => {
    const { lines, tone } = buildTariffCardViewModel(
      buildCatalogRow({ tour: null })
    );

    expect(lines[1]).toEqual({
      amounts: TARIFF_CATALOG_COPY.NO_TARIFF,
      label: TARIFF_CATALOG_COPY.TYPE_LABEL_TOUR,
      unit: null,
    });
    expect(tone).toBe(TARIFF_CARD_TONE.STANDARD);
  });

  it("mutes a category with no tariff in both lines", () => {
    const { tone } = buildTariffCardViewModel(
      buildCatalogRow({ rental: null, tour: null })
    );

    expect(tone).toBe(TARIFF_CARD_TONE.MUTED);
  });
});

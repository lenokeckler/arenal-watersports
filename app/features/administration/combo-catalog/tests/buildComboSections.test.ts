import { describe, expect, it, vi } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import {
  COMBO_AUDIENCE_EMPTY,
  COMBO_AUDIENCE_TITLE,
} from "../constants/ComboAudienceCopy.constants";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { ComboCardActions } from "../models/ComboCardActions.interface";
import { buildComboSections } from "../utils/buildComboSections";
import {
  buildCombo,
  DEFAULT_COMBO,
  EXPECTED_ITEMS_SUMMARY,
  FOREIGN_PRICE,
  NATIONAL_PRICE,
  SECOND_COMBO_ID,
} from "./Combo.constants";

const buildActions = (): ComboCardActions => ({
  onReactivateClick: vi.fn(),
  onRemoveClick: vi.fn(),
  pendingComboId: SECOND_COMBO_ID,
});

describe("buildComboSections", () => {
  it("returns national first and foreign second with their copy", () => {
    const sections = buildComboSections([], buildActions());

    expect(sections.map(({ title }) => title)).toEqual([
      COMBO_AUDIENCE_TITLE[COMBO_AUDIENCE.NATIONAL],
      COMBO_AUDIENCE_TITLE[COMBO_AUDIENCE.FOREIGN],
    ]);
    expect(
      sections.map(({ emptyMessage }) => emptyMessage)
    ).toEqual([
      COMBO_AUDIENCE_EMPTY[COMBO_AUDIENCE.NATIONAL],
      COMBO_AUDIENCE_EMPTY[COMBO_AUDIENCE.FOREIGN],
    ]);
  });

  it("places each combo in its audience with the items summary and its currency price", () => {
    const foreignCombo = buildCombo({
      audience: COMBO_AUDIENCE.FOREIGN,
      id: SECOND_COMBO_ID,
      packagePrice: FOREIGN_PRICE,
    });

    const [national, foreign] = buildComboSections(
      [DEFAULT_COMBO, foreignCombo],
      buildActions()
    );

    expect(national.cards).toHaveLength(1);
    expect(national.cards[0].itemsSummary).toBe(
      EXPECTED_ITEMS_SUMMARY
    );
    expect(national.cards[0].priceLabel).toBe(
      formatMoney({
        amount: NATIONAL_PRICE,
        currency: CURRENCY_CODE.CRC,
      })
    );
    expect(foreign.cards[0].priceLabel).toBe(
      formatMoney({
        amount: FOREIGN_PRICE,
        currency: CURRENCY_CODE.USD,
      })
    );
  });

  it("marks only the pending combo as loading", () => {
    const [national, foreign] = buildComboSections(
      [
        DEFAULT_COMBO,
        buildCombo({
          audience: COMBO_AUDIENCE.FOREIGN,
          id: SECOND_COMBO_ID,
        }),
      ],
      buildActions()
    );

    expect(national.cards[0].isActionLoading).toBe(false);
    expect(foreign.cards[0].isActionLoading).toBe(true);
  });

  it("falls back for a combo without items or price", () => {
    const [national] = buildComboSections(
      [buildCombo({ items: [], packagePrice: null })],
      buildActions()
    );

    expect(national.cards[0].itemsSummary).toBe(
      COMBO_CATALOG_COPY.NO_ITEMS
    );
    expect(national.cards[0].priceLabel).toBe(
      COMBO_CATALOG_COPY.NO_PRICE
    );
  });
});

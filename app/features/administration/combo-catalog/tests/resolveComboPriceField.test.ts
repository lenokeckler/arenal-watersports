import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import {
  COMBO_PRICE_LABEL,
  COMBO_PRICE_PLACEHOLDER,
} from "../constants/ComboPriceFieldCopy.constants";
import { resolveComboPriceField } from "../utils/resolveComboPriceField";

describe("resolveComboPriceField", () => {
  it("prices a national combo in colones", () => {
    expect(
      resolveComboPriceField(COMBO_AUDIENCE.NATIONAL)
    ).toEqual({
      currency: CURRENCY_CODE.CRC,
      label: COMBO_PRICE_LABEL[COMBO_AUDIENCE.NATIONAL],
      placeholder:
        COMBO_PRICE_PLACEHOLDER[COMBO_AUDIENCE.NATIONAL],
    });
  });

  it("prices a foreign combo in dollars", () => {
    expect(
      resolveComboPriceField(COMBO_AUDIENCE.FOREIGN)
    ).toEqual({
      currency: CURRENCY_CODE.USD,
      label: COMBO_PRICE_LABEL[COMBO_AUDIENCE.FOREIGN],
      placeholder:
        COMBO_PRICE_PLACEHOLDER[COMBO_AUDIENCE.FOREIGN],
    });
  });
});

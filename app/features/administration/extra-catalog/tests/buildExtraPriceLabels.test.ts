import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { buildExtraPriceLabels } from "../utils/buildExtraPriceLabels";
import {
  DEFAULT_EXTRA,
  FAKE_EXTRA_PRICE_CRC,
  FAKE_EXTRA_PRICE_USD,
} from "./Extra.constants";
import { buildExtra } from "./ExtraList.constants";

const USD_LABEL = formatMoney({
  amount: FAKE_EXTRA_PRICE_USD,
  currency: CURRENCY_CODE.USD,
});
const CRC_LABEL = formatMoney({
  amount: FAKE_EXTRA_PRICE_CRC,
  currency: CURRENCY_CODE.CRC,
});

describe("buildExtraPriceLabels", () => {
  it("formats each price with the project money format, dollars first", () => {
    expect(
      buildExtraPriceLabels(
        buildExtra({ priceCrc: FAKE_EXTRA_PRICE_CRC })
      )
    ).toStrictEqual([USD_LABEL, CRC_LABEL]);
  });

  it("returns only the price the extra has", () => {
    expect(
      buildExtraPriceLabels(DEFAULT_EXTRA)
    ).toStrictEqual([USD_LABEL]);
    expect(
      buildExtraPriceLabels(
        buildExtra({
          priceUsd: null,
          priceCrc: FAKE_EXTRA_PRICE_CRC,
        })
      )
    ).toStrictEqual([CRC_LABEL]);
  });

  it("shows a zero price", () => {
    expect(
      buildExtraPriceLabels(buildExtra({ priceUsd: 0 }))
    ).toHaveLength(1);
  });

  it("returns nothing when the extra has no price", () => {
    expect(
      buildExtraPriceLabels(
        buildExtra({ priceUsd: null, priceCrc: null })
      )
    ).toStrictEqual([]);
  });
});

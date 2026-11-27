import { describe, expect, it } from "vitest";
import { hasTariffAmounts } from "../utils/hasTariffAmounts";
import {
  EMPTY_AMOUNTS,
  TOUR_ONLY_USD_AMOUNTS,
} from "./TariffCatalog.constants";

describe("hasTariffAmounts", () => {
  it("is false when there is no tariff", () => {
    expect(hasTariffAmounts(null)).toBe(false);
  });

  it("is false when the tariff has no amount in any currency", () => {
    expect(hasTariffAmounts(EMPTY_AMOUNTS)).toBe(false);
  });

  it("is true with an amount in only one currency", () => {
    expect(hasTariffAmounts(TOUR_ONLY_USD_AMOUNTS)).toBe(
      true
    );
  });
});

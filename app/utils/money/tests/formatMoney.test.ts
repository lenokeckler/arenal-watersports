import { describe, expect, it } from "vitest";
import { formatMoney } from "../formatMoney";
import {
  CRC_FOUR_DIGITS,
  CRC_INTEGER,
  CRC_MILLIONS,
  CRC_ONE_DECIMAL,
  CRC_THOUSANDS,
  CRC_WITH_CENTS,
  CRC_ZERO,
  EXPECTED_CRC_FOUR_DIGITS,
  EXPECTED_CRC_INTEGER,
  EXPECTED_CRC_MILLIONS,
  EXPECTED_CRC_ONE_DECIMAL,
  EXPECTED_CRC_THOUSANDS,
  EXPECTED_CRC_WITH_CENTS,
  EXPECTED_CRC_ZERO,
  EXPECTED_USD_INTEGER,
  EXPECTED_USD_THOUSANDS,
  EXPECTED_USD_WITH_CENTS,
  EXPECTED_USD_ZERO,
  USD_INTEGER,
  USD_THOUSANDS,
  USD_WITH_CENTS,
  USD_ZERO,
} from "./formatMoney.constants";

describe("formatMoney", () => {
  it("prints a whole dollar amount with two decimals", () => {
    expect(formatMoney(USD_INTEGER)).toBe(
      EXPECTED_USD_INTEGER
    );
  });

  it("prints dollars with cents and a comma thousands separator", () => {
    expect(formatMoney(USD_WITH_CENTS)).toBe(
      EXPECTED_USD_WITH_CENTS
    );
  });

  it("keeps two decimals on a whole dollar amount in the thousands", () => {
    expect(formatMoney(USD_THOUSANDS)).toBe(
      EXPECTED_USD_THOUSANDS
    );
  });

  it("prints a whole colon amount without decimals", () => {
    expect(formatMoney(CRC_INTEGER)).toBe(
      EXPECTED_CRC_INTEGER
    );
  });

  it("groups colon thousands with non-breaking spaces", () => {
    expect(formatMoney(CRC_THOUSANDS)).toBe(
      EXPECTED_CRC_THOUSANDS
    );
  });

  it("groups colon millions with non-breaking spaces", () => {
    expect(formatMoney(CRC_MILLIONS)).toBe(
      EXPECTED_CRC_MILLIONS
    );
  });

  it("prints colon cents with two decimals and a decimal comma", () => {
    expect(formatMoney(CRC_WITH_CENTS)).toBe(
      EXPECTED_CRC_WITH_CENTS
    );
  });

  it("pads a one-decimal colon amount to two decimals", () => {
    expect(formatMoney(CRC_ONE_DECIMAL)).toBe(
      EXPECTED_CRC_ONE_DECIMAL
    );
  });

  it("groups a four-digit colon amount with a non-breaking space", () => {
    expect(formatMoney(CRC_FOUR_DIGITS)).toBe(
      EXPECTED_CRC_FOUR_DIGITS
    );
  });

  it("prints a zero dollar amount with two decimals", () => {
    expect(formatMoney(USD_ZERO)).toBe(EXPECTED_USD_ZERO);
  });

  it("prints a zero colon amount without decimals", () => {
    expect(formatMoney(CRC_ZERO)).toBe(EXPECTED_CRC_ZERO);
  });
});

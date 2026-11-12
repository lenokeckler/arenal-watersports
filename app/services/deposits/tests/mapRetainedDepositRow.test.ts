import { describe, expect, it } from "vitest";
import { DepositRowIncompleteError } from "../DepositRowIncompleteError";
import { mapRetainedDepositRow } from "../mapRetainedDepositRow";
import {
  MULTILINE_REASON,
  PARTIAL_CRC_ITEM,
  PARTIAL_CRC_ROW,
  RETAINED_USD_ITEM,
  RETAINED_USD_ROW,
} from "./RetainedDeposits.constants";

describe("mapRetainedDepositRow", () => {
  it("maps a fully retained row to the domain item", () => {
    expect(mapRetainedDepositRow(RETAINED_USD_ROW)).toEqual(
      RETAINED_USD_ITEM
    );
  });

  it("maps a partial retention keeping its status, currency and cents", () => {
    expect(mapRetainedDepositRow(PARTIAL_CRC_ROW)).toEqual(
      PARTIAL_CRC_ITEM
    );
  });

  it("throws when the retained amount is missing", () => {
    expect(() =>
      mapRetainedDepositRow({
        ...RETAINED_USD_ROW,
        retained_amount: null,
      })
    ).toThrow(DepositRowIncompleteError);
  });

  it("throws when the retention reason is missing", () => {
    expect(() =>
      mapRetainedDepositRow({
        ...RETAINED_USD_ROW,
        retention_reason: null,
      })
    ).toThrow(DepositRowIncompleteError);
  });

  it("passes an empty reason through unchanged", () => {
    const item = mapRetainedDepositRow({
      ...RETAINED_USD_ROW,
      retention_reason: "",
    });

    expect(item.retentionReason).toBe("");
  });

  it("preserves the line breaks of the reason", () => {
    const item = mapRetainedDepositRow({
      ...RETAINED_USD_ROW,
      retention_reason: MULTILINE_REASON,
    });

    expect(item.retentionReason).toBe(MULTILINE_REASON);
  });

  it("does not treat a retained amount of zero as missing", () => {
    const item = mapRetainedDepositRow({
      ...RETAINED_USD_ROW,
      retained_amount: 0,
    });

    expect(item.retainedAmount).toBe(0);
  });

  it("never exposes the deposit amount", () => {
    expect(
      mapRetainedDepositRow(RETAINED_USD_ROW)
    ).not.toHaveProperty("amount");
  });
});

import { describe, expect, it } from "vitest";
import { hasReservationRefundable } from "../hasReservationRefundable";
import {
  CRC_EMPTY,
  CRC_REFUNDABLE,
  USD_EMPTY,
  USD_REFUNDABLE,
} from "./hasReservationRefundable.constants";

describe("hasReservationRefundable", () => {
  it("is true when one currency has something to refund", () => {
    expect(
      hasReservationRefundable([USD_EMPTY, CRC_REFUNDABLE])
    ).toBe(true);
  });

  it("is true when both currencies have something to refund", () => {
    expect(
      hasReservationRefundable([
        USD_REFUNDABLE,
        CRC_REFUNDABLE,
      ])
    ).toBe(true);
  });

  it("is false when every currency is at zero", () => {
    expect(
      hasReservationRefundable([USD_EMPTY, CRC_EMPTY])
    ).toBe(false);
  });

  it("is false when there are no amounts", () => {
    expect(hasReservationRefundable([])).toBe(false);
  });
});

import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { orderReservationChargeRecordedParts } from "../utils/orderReservationChargeRecordedParts";
import { MIXED_RECORDED } from "./ReservationChargeRecordedParts.constants";

describe("orderReservationChargeRecordedParts", () => {
  it("puts dollars before colones whatever the input order", () => {
    const ordered = orderReservationChargeRecordedParts(
      MIXED_RECORDED.parts
    );

    expect(ordered.map((part) => part.currency)).toEqual([
      CURRENCY_CODE.USD,
      CURRENCY_CODE.CRC,
    ]);
  });

  it("keeps every chargeId exactly once", () => {
    const ordered = orderReservationChargeRecordedParts(
      MIXED_RECORDED.parts
    );

    expect(
      new Set(ordered.map((part) => part.chargeId)).size
    ).toBe(MIXED_RECORDED.parts.length);
  });

  it("returns nothing for no parts", () => {
    expect(orderReservationChargeRecordedParts([])).toEqual(
      []
    );
  });
});

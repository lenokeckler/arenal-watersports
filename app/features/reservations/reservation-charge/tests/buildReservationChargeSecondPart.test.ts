import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { buildReservationChargeSecondPart } from "../utils/buildReservationChargeSecondPart";
import {
  MIXED_CHARGE_INPUT,
  VALID_CHARGE_INPUT,
} from "./ReservationChargeValues.constants";

describe("buildReservationChargeSecondPart", () => {
  it("returns no part without a second amount", () => {
    expect(
      buildReservationChargeSecondPart(VALID_CHARGE_INPUT)
    ).toEqual([]);
  });

  it("returns the part in the other currency", () => {
    expect(
      buildReservationChargeSecondPart(MIXED_CHARGE_INPUT)
    ).toEqual([
      { amount: 12000, currency: CURRENCY_CODE.CRC },
    ]);
  });
});

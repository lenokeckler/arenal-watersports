import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationRefundInitialValues } from "../utils/resolveReservationRefundInitialValues";
import {
  BOTH_REFUNDABLE,
  CRC_ONLY_REFUNDABLE,
} from "./ReservationRefundForm.constants";

describe("resolveReservationRefundInitialValues", () => {
  it("starts on USD with nothing typed and no reason chosen", () => {
    expect(
      resolveReservationRefundInitialValues(BOTH_REFUNDABLE)
    ).toEqual({
      amountText: STRING.Empty,
      currency: CURRENCY_CODE.USD,
      otherReasonText: STRING.Empty,
      reason: null,
    });
  });

  it("starts on the only currency with money to refund", () => {
    expect(
      resolveReservationRefundInitialValues(
        CRC_ONLY_REFUNDABLE
      ).currency
    ).toBe(CURRENCY_CODE.CRC);
  });
});

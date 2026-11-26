import { describe, expect, it } from "vitest";
import { buildReservationChargeCommand } from "../utils/buildReservationChargeCommand";
import { VALID_CHARGE_COMMAND } from "./ReservationChargeAction.constants";
import {
  NON_BREAKING_SPACE,
  OTHER_CHARGE_VALUES,
  OTHER_METHOD_TEXT,
  VALID_CHARGE_INPUT,
} from "./ReservationChargeValues.constants";

describe("buildReservationChargeCommand", () => {
  it("parses the amount and keeps the other fields", () => {
    expect(
      buildReservationChargeCommand(VALID_CHARGE_INPUT)
    ).toEqual(VALID_CHARGE_COMMAND);
  });

  it("trims the payment method edges like the validator", () => {
    const paddedMethod = `${NON_BREAKING_SPACE} ${OTHER_METHOD_TEXT} ${NON_BREAKING_SPACE}`;

    expect(
      buildReservationChargeCommand({
        ...OTHER_CHARGE_VALUES,
        otherPaymentMethod: paddedMethod,
        reservationId: VALID_CHARGE_INPUT.reservationId,
      }).paymentMethod
    ).toBe(OTHER_METHOD_TEXT);
  });
});

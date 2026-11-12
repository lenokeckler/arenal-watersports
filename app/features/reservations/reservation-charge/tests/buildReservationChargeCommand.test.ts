import { describe, expect, it } from "vitest";
import { buildReservationChargeCommand } from "../utils/buildReservationChargeCommand";
import { VALID_CHARGE_COMMAND } from "./ReservationChargeAction.constants";
import {
  NON_BREAKING_SPACE,
  VALID_CHARGE_INPUT,
} from "./ReservationChargeValues.constants";

describe("buildReservationChargeCommand", () => {
  it("parses the amount and keeps the other fields", () => {
    expect(
      buildReservationChargeCommand(VALID_CHARGE_INPUT)
    ).toEqual(VALID_CHARGE_COMMAND);
  });

  it("trims the payment method edges like the validator", () => {
    const paddedMethod = `${NON_BREAKING_SPACE} ${VALID_CHARGE_INPUT.paymentMethod} ${NON_BREAKING_SPACE}`;

    expect(
      buildReservationChargeCommand({
        ...VALID_CHARGE_INPUT,
        paymentMethod: paddedMethod,
      }).paymentMethod
    ).toBe(VALID_CHARGE_INPUT.paymentMethod);
  });
});

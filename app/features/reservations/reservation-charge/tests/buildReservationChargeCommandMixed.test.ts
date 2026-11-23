import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { buildReservationChargeCommand } from "../utils/buildReservationChargeCommand";
import {
  MIXED_CHARGE_COMMAND,
  VALID_CHARGE_COMMAND,
} from "./ReservationChargeAction.constants";
import {
  PADDED_SECOND_AMOUNT_TEXT,
  PARSED_SECOND_AMOUNT,
} from "./ReservationChargeSecondAmount.constants";
import {
  MIXED_CHARGE_INPUT,
  NON_BREAKING_SPACE,
  VALID_CHARGE_INPUT,
} from "./ReservationChargeValues.constants";

describe("buildReservationChargeCommand mixed", () => {
  it("builds one part in single mode", () => {
    expect(
      buildReservationChargeCommand(VALID_CHARGE_INPUT)
    ).toEqual(VALID_CHARGE_COMMAND);
  });

  it("builds two parts in order, USD first", () => {
    expect(
      buildReservationChargeCommand(MIXED_CHARGE_INPUT)
    ).toEqual(MIXED_CHARGE_COMMAND);
  });

  it("puts the USD part second when CRC is first", () => {
    expect(
      buildReservationChargeCommand({
        ...MIXED_CHARGE_INPUT,
        currency: CURRENCY_CODE.CRC,
      }).parts.map(({ currency }) => currency)
    ).toEqual([CURRENCY_CODE.CRC, CURRENCY_CODE.USD]);
  });

  it("parses the second amount text", () => {
    expect(
      buildReservationChargeCommand({
        ...MIXED_CHARGE_INPUT,
        secondAmountText: PADDED_SECOND_AMOUNT_TEXT,
      }).parts[1].amount
    ).toBe(PARSED_SECOND_AMOUNT);
  });

  it("trims the shared payment method", () => {
    expect(
      buildReservationChargeCommand({
        ...MIXED_CHARGE_INPUT,
        paymentMethod: `${NON_BREAKING_SPACE}${MIXED_CHARGE_INPUT.paymentMethod}${NON_BREAKING_SPACE}`,
      }).paymentMethod
    ).toBe(MIXED_CHARGE_INPUT.paymentMethod);
  });
});

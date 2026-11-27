import { describe, expect, it } from "vitest";
import { buildReservationRefundCommand } from "../utils/buildReservationRefundCommand";
import { VALID_REFUND_COMMAND } from "./ReservationRefundAction.constants";
import {
  NON_BREAKING_SPACE,
  OTHER_REASON_TEXT,
  OTHER_REFUND_VALUES,
  VALID_REFUND_INPUT,
} from "./ReservationRefundValues.constants";

describe("buildReservationRefundCommand", () => {
  it("parses the amount and stores the preset label", () => {
    expect(
      buildReservationRefundCommand(VALID_REFUND_INPUT)
    ).toEqual(VALID_REFUND_COMMAND);
  });

  it("reads a comma decimal", () => {
    expect(
      buildReservationRefundCommand({
        ...VALID_REFUND_INPUT,
        amountText: " 20,5 ",
      }).amount
    ).toBe(20.5);
  });

  it("stores the trimmed text of the other reason", () => {
    expect(
      buildReservationRefundCommand({
        ...VALID_REFUND_INPUT,
        ...OTHER_REFUND_VALUES,
        otherReasonText: `${NON_BREAKING_SPACE} ${OTHER_REASON_TEXT} `,
      }).reason
    ).toBe(OTHER_REASON_TEXT);
  });

  it("ignores the free text of a preset reason", () => {
    expect(
      buildReservationRefundCommand({
        ...VALID_REFUND_INPUT,
        otherReasonText: OTHER_REASON_TEXT,
      })
    ).toEqual(VALID_REFUND_COMMAND);
  });
});

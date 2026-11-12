import { describe, expect, it } from "vitest";
import { parseReservationChargeAmount } from "../utils/parseReservationChargeAmount";
import { CHARGE_AMOUNT_TEXT_CASES } from "./ReservationChargeAction.constants";

describe("parseReservationChargeAmount", () => {
  it.each(CHARGE_AMOUNT_TEXT_CASES)(
    "parses $amountText",
    ({ amountText, expected }) => {
      expect(parseReservationChargeAmount(amountText)).toBe(
        expected
      );
    }
  );
});

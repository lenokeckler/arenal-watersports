import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationChargeInitialValues } from "../utils/resolveReservationChargeInitialValues";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
} from "./ReservationCharge.constants";
import {
  CRC_ONLY_PROPOSAL,
  CRC_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";

describe("resolveReservationChargeInitialValues", () => {
  it("starts on USD with its proposal when both exist", () => {
    expect(
      resolveReservationChargeInitialValues(BOTH_PROPOSAL)
    ).toEqual({
      amountText: USD_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.USD,
      paymentMethod: STRING.Empty,
    });
  });

  it("starts on the only currency with a proposal", () => {
    expect(
      resolveReservationChargeInitialValues(
        CRC_ONLY_PROPOSAL
      )
    ).toEqual({
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
      paymentMethod: STRING.Empty,
    });
  });

  it("starts on USD with an empty amount when nothing is proposed", () => {
    expect(
      resolveReservationChargeInitialValues(EMPTY_PROPOSAL)
    ).toEqual({
      amountText: STRING.Empty,
      currency: CURRENCY_CODE.USD,
      paymentMethod: STRING.Empty,
    });
  });
});

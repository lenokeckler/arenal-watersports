import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import ReservationRefundAvailable from "../components/ReservationRefundAvailable";
import { RESERVATION_REFUND_UI_COPY as COPY } from "../constants/ReservationRefundUiCopy.constants";
import {
  BOTH_REFUND,
  USD_ONLY_REFUND,
} from "./ReservationRefundForm.constants";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
} from "./ReservationRefundValues.constants";

const getValue = (currencyName: string) =>
  screen.getByText(currencyName).nextElementSibling
    ?.textContent;

describe("ReservationRefundAvailable", () => {
  it("lists each currency with its own amount, never summed", () => {
    render(
      <ReservationRefundAvailable refund={BOTH_REFUND} />
    );

    expect(getValue(CURRENCY_NAME_COPY.USD)).toContain(
      String(AVAILABLE_USD)
    );
    expect(getValue(CURRENCY_NAME_COPY.CRC)).toContain(
      String(AVAILABLE_CRC / 1000)
    );
  });

  it("writes text instead of a number for a currency with nothing left", () => {
    render(
      <ReservationRefundAvailable
        refund={USD_ONLY_REFUND}
      />
    );

    expect(getValue(CURRENCY_NAME_COPY.CRC)).toBe(
      COPY.NOTHING_IN_CURRENCY
    );
    expect(getValue(CURRENCY_NAME_COPY.USD)).not.toBe(
      COPY.NOTHING_IN_CURRENCY
    );
  });
});

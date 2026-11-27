import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
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

const USD_TEXT = formatMoney({
  amount: AVAILABLE_USD,
  currency: CURRENCY_CODE.USD,
});
const CRC_TEXT = formatMoney({
  amount: AVAILABLE_CRC,
  currency: CURRENCY_CODE.CRC,
});

const getValue = (currencyName: string) =>
  screen.getByText(currencyName).nextElementSibling
    ?.textContent;

describe("ReservationRefundAvailable", () => {
  it("lists each currency with its own formatted amount", () => {
    render(
      <ReservationRefundAvailable refund={BOTH_REFUND} />
    );

    expect(getValue(CURRENCY_NAME_COPY.USD)).toBe(USD_TEXT);
    expect(getValue(CURRENCY_NAME_COPY.CRC)).toBe(CRC_TEXT);
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
    expect(getValue(CURRENCY_NAME_COPY.USD)).toBe(USD_TEXT);
  });
});

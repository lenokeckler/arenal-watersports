import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { useReservationRefundValues } from "../hooks/useReservationRefundValues";
import {
  BOTH_REFUNDABLE,
  CRC_ONLY_REFUNDABLE,
  EDITED_AMOUNT_TEXT,
} from "./ReservationRefundForm.constants";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
  OTHER_REASON_TEXT,
} from "./ReservationRefundValues.constants";

const renderValues = (
  refundable: typeof BOTH_REFUNDABLE = BOTH_REFUNDABLE
) =>
  renderHook(() =>
    useReservationRefundValues({ refundable })
  );

describe("useReservationRefundValues", () => {
  it("starts empty on USD with both currencies offered", () => {
    const { result } = renderValues();

    expect(result.current.values).toEqual({
      amountText: STRING.Empty,
      currency: CURRENCY_CODE.USD,
      otherReasonText: STRING.Empty,
      reason: null,
    });
    expect(result.current.currencyOptions).toEqual([
      CURRENCY_CODE.USD,
      CURRENCY_CODE.CRC,
    ]);
    expect(result.current.available).toBe(AVAILABLE_USD);
  });

  it("starts on the only currency with money to refund", () => {
    const { result } = renderValues(CRC_ONLY_REFUNDABLE);

    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.CRC
    );
    expect(result.current.available).toBe(AVAILABLE_CRC);
  });

  it("follows the available amount of the selected currency", () => {
    const { result } = renderValues();

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.available).toBe(AVAILABLE_CRC);
  });

  it("keeps the typed amount when the currency changes", () => {
    const { result } = renderValues();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.amountText).toBe(
      EDITED_AMOUNT_TEXT
    );
  });

  it("discards the free text when a preset reason replaces Otro", () => {
    const { result } = renderValues();
    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.OTHER
      )
    );
    act(() =>
      result.current.setOtherReasonText(OTHER_REASON_TEXT)
    );

    act(() =>
      result.current.setReason(
        RESERVATION_REFUND_REASON.CANCELLED_TRIP
      )
    );

    expect(result.current.values).toMatchObject({
      otherReasonText: STRING.Empty,
      reason: RESERVATION_REFUND_REASON.CANCELLED_TRIP,
    });
  });
});

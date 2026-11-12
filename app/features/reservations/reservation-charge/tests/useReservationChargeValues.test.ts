import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { useReservationChargeValues } from "../hooks/useReservationChargeValues";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
  MIXED_USD_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";

describe("useReservationChargeValues", () => {
  it("starts on USD with both currencies offered", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    expect(result.current.values).toEqual({
      amountText: USD_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.USD,
      paymentMethod: STRING.Empty,
    });
    expect(result.current.currencyOptions).toEqual([
      CURRENCY_CODE.USD,
      CURRENCY_CODE.CRC,
    ]);
  });

  it("offers one currency when only one has a proposal", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(MIXED_PROPOSAL)
    );

    expect(result.current.values.amountText).toBe(
      MIXED_USD_PROPOSAL_TEXT
    );
    expect(result.current.currencyOptions).toEqual([
      CURRENCY_CODE.USD,
    ]);
  });

  it("starts empty with every currency when nothing is proposed", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(EMPTY_PROPOSAL)
    );

    expect(result.current.values.amountText).toBe(
      STRING.Empty
    );
    expect(result.current.currencyOptions).toEqual([
      CURRENCY_CODE.USD,
      CURRENCY_CODE.CRC,
    ]);
  });

  it("swaps the untouched proposal when the currency changes", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.CRC
    );
    expect(result.current.values.amountText).toBe(
      CRC_PROPOSAL_TEXT
    );
  });

  it("keeps an edited amount when the currency changes", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

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

  it("stores the edited method", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setPaymentMethod(EDITED_METHOD_TEXT)
    );

    expect(result.current.values.paymentMethod).toBe(
      EDITED_METHOD_TEXT
    );
  });
});

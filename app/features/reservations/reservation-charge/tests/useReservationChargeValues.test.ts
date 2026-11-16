import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { useReservationChargeValues } from "../hooks/useReservationChargeValues";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  MIXED_USD_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { OTHER_METHOD_TEXT } from "./ReservationChargeValues.constants";

describe("useReservationChargeValues", () => {
  it("starts on USD with the catalog amount", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    expect(result.current.values).toEqual({
      amountText: USD_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.USD,
      otherPaymentMethod: STRING.Empty,
      paymentChoice: null,
      secondAmountText: null,
    });
  });

  it("starts on the proposed currency when only one has a proposal", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(MIXED_PROPOSAL)
    );

    expect(result.current.values.amountText).toBe(
      MIXED_USD_PROPOSAL_TEXT
    );
    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.USD
    );
  });

  it("starts empty on USD when nothing is proposed", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(EMPTY_PROPOSAL)
    );

    expect(result.current.values.amountText).toBe(
      STRING.Empty
    );
    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.USD
    );
  });

  it("empties the amount when switching to a currency without a proposal", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(MIXED_PROPOSAL)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.CRC
    );
    expect(result.current.values.amountText).toBe(
      STRING.Empty
    );
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

  it("stores the chosen chip", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setPaymentChoice(
        RESERVATION_CHARGE_PAYMENT_CHOICE.PAYPAL
      )
    );

    expect(result.current.values.paymentChoice).toBe(
      RESERVATION_CHARGE_PAYMENT_CHOICE.PAYPAL
    );
  });

  it("stores the other method text", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setOtherPaymentMethod(
        OTHER_METHOD_TEXT
      )
    );

    expect(result.current.values.otherPaymentMethod).toBe(
      OTHER_METHOD_TEXT
    );
  });

  it("keeps the other text when another chip is chosen and Otro is chosen again", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setPaymentChoice(
        RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
      )
    );
    act(() =>
      result.current.setOtherPaymentMethod(
        OTHER_METHOD_TEXT
      )
    );
    act(() =>
      result.current.setPaymentChoice(
        RESERVATION_CHARGE_PAYMENT_CHOICE.CASH
      )
    );
    act(() =>
      result.current.setPaymentChoice(
        RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
      )
    );

    expect(result.current.values.otherPaymentMethod).toBe(
      OTHER_METHOD_TEXT
    );
  });

  it("restores each untouched proposal when switching back and forth", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.USD)
    );

    expect(result.current.values.currency).toBe(
      CURRENCY_CODE.USD
    );
    expect(result.current.values.amountText).toBe(
      USD_PROPOSAL_TEXT
    );
  });

  it("keeps the edited amount through a round trip of currencies", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.USD)
    );

    expect(result.current.values.amountText).toBe(
      EDITED_AMOUNT_TEXT
    );
  });

  it("refills the proposal after the worker clears the amount and switches", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() => result.current.setAmountText(STRING.Empty));
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.amountText).toBe(
      CRC_PROPOSAL_TEXT
    );
  });

  it("keeps the payment method when the currency changes", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setPaymentChoice(
        RESERVATION_CHARGE_PAYMENT_CHOICE.SINPE
      )
    );
    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.paymentChoice).toBe(
      RESERVATION_CHARGE_PAYMENT_CHOICE.SINPE
    );
  });
});

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { useReservationChargeValues } from "../hooks/useReservationChargeValues";
import {
  BOTH_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  MIXED_USD_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";
import { SECOND_AMOUNT_TEXT_CASES } from "./ReservationChargeSecondAmount.constants";

describe("useReservationChargeValues mixed mode", () => {
  it("opens an empty second amount and keeps the first", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() => result.current.toggleSecondAmount());

    expect(result.current.values.secondAmountText).toBe(
      STRING.Empty
    );
    expect(result.current.values.amountText).toBe(
      USD_PROPOSAL_TEXT
    );
  });

  it("opens the second amount when only one currency has a proposal", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(MIXED_PROPOSAL)
    );

    act(() => result.current.toggleSecondAmount());

    expect(result.current.values.secondAmountText).toBe(
      STRING.Empty
    );
    expect(result.current.values.amountText).toBe(
      MIXED_USD_PROPOSAL_TEXT
    );
  });

  it("edits the second amount text", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() => result.current.toggleSecondAmount());
    act(() =>
      result.current.setSecondAmountText(
        SECOND_AMOUNT_TEXT_CASES.VALID
      )
    );

    expect(result.current.values.secondAmountText).toBe(
      SECOND_AMOUNT_TEXT_CASES.VALID
    );
  });

  it("drops the second amount and keeps the first when toggled off", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() => result.current.toggleSecondAmount());
    act(() =>
      result.current.setSecondAmountText(
        SECOND_AMOUNT_TEXT_CASES.VALID
      )
    );
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );
    act(() => result.current.toggleSecondAmount());

    expect(
      result.current.values.secondAmountText
    ).toBeNull();
    expect(result.current.values.amountText).toBe(
      EDITED_AMOUNT_TEXT
    );
  });

  it("keeps single mode when the currency switches", () => {
    const { result } = renderHook(() =>
      useReservationChargeValues(BOTH_PROPOSAL)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(
      result.current.values.secondAmountText
    ).toBeNull();
    expect(result.current.values.amountText).toBe(
      CRC_PROPOSAL_TEXT
    );
  });
});

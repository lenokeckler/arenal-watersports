import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { useReservationDepositValues } from "../hooks/useReservationDepositValues";
import { BOTH_PROPOSAL } from "./ReservationDeposit.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  RECEIVED_DEPOSIT_VALUES,
} from "./ReservationDepositValues.constants";

const renderValues = () =>
  renderHook(() =>
    useReservationDepositValues(BOTH_PROPOSAL)
  );

describe("useReservationDepositValues", () => {
  it("starts on the proposal in dollars", () => {
    const { result } = renderValues();

    expect(result.current.values).toEqual(
      RECEIVED_DEPOSIT_VALUES
    );
    expect(result.current.proposal).toBe(BOTH_PROPOSAL);
  });

  it("moves an untouched proposal to the new currency", () => {
    const { result } = renderValues();

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values).toMatchObject({
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
    });
  });

  it("drops a typed amount when the currency changes", () => {
    const { result } = renderValues();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    act(() =>
      result.current.setCurrency(CURRENCY_CODE.CRC)
    );

    expect(result.current.values.amountText).toBe(
      CRC_PROPOSAL_TEXT
    );
  });

  it("keeps the amount when the answer goes to no and back", () => {
    const { result } = renderValues();
    act(() =>
      result.current.setAmountText(EDITED_AMOUNT_TEXT)
    );

    act(() => result.current.setHasDeposit(false));
    act(() => result.current.setHasDeposit(true));

    expect(result.current.values).toMatchObject({
      amountText: EDITED_AMOUNT_TEXT,
      hasDeposit: true,
    });
  });
});

import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { useReservationChargeErrorFocus } from "../hooks/useReservationChargeErrorFocus";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";

const FOCUSABLE_IDS = [
  RESERVATION_CHARGE_FIELD_ID.AMOUNT,
  RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD,
  RESERVATION_CHARGE_FIELD_ID.ALERT,
];

const mountFocusables = (): void => {
  FOCUSABLE_IDS.forEach((id) => {
    const element = document.createElement("input");
    element.id = id;
    document.body.append(element);
  });
};

const renderFocus = (
  errors: ReservationChargeErrors,
  formError: string
): void => {
  renderHook(() =>
    useReservationChargeErrorFocus(errors, formError)
  );
};

describe("useReservationChargeErrorFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it.each([
    {
      errors: { amount: "a", paymentMethod: "b" },
      expected: RESERVATION_CHARGE_FIELD_ID.AMOUNT,
      formError: "c",
    },
    {
      errors: { paymentMethod: "b" },
      expected: RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD,
      formError: "c",
    },
    {
      errors: {},
      expected: RESERVATION_CHARGE_FIELD_ID.ALERT,
      formError: "c",
    },
  ])(
    "focuses $expected first",
    ({ errors, expected, formError }) => {
      mountFocusables();

      renderFocus(errors, formError);

      expect(document.activeElement?.id).toBe(expected);
    }
  );

  it("focuses nothing when there is no problem", () => {
    mountFocusables();

    renderFocus({}, "");

    expect(document.activeElement).toBe(document.body);
  });
});

import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_FIELD_ID } from "../constants/ReservationDepositUi.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as VALIDATION } from "../constants/ReservationDepositValidationCopy.constants";
import { useReservationDepositErrorFocus } from "../hooks/useReservationDepositErrorFocus";
import { useReservationDepositSuccessFocus } from "../hooks/useReservationDepositSuccessFocus";
import type { ReservationDepositErrors } from "../models/ReservationDepositErrors.interface";

interface FocusProps {
  errors: ReservationDepositErrors;
  formError: string;
}

const mountFocusables = (): void => {
  Object.values(RESERVATION_DEPOSIT_FIELD_ID).forEach(
    (id) => {
      const element = document.createElement("input");
      element.id = id;
      document.body.append(element);
    }
  );
};

const renderFocus = (initial: FocusProps) =>
  renderHook(
    ({ errors, formError }: FocusProps) =>
      useReservationDepositErrorFocus(errors, formError),
    { initialProps: initial }
  );

describe("useReservationDepositErrorFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("focuses the amount before the alert", () => {
    mountFocusables();

    renderFocus({
      errors: { amount: VALIDATION.AMOUNT_REQUIRED },
      formError: FEEDBACK.GENERIC,
    });

    expect(document.activeElement?.id).toBe(
      RESERVATION_DEPOSIT_FIELD_ID.AMOUNT
    );
  });

  it("focuses the alert for a form error", () => {
    mountFocusables();

    renderFocus({
      errors: {},
      formError: FEEDBACK.GENERIC,
    });

    expect(document.activeElement?.id).toBe(
      RESERVATION_DEPOSIT_FIELD_ID.ALERT
    );
  });

  it("focuses nothing when there is no problem", () => {
    mountFocusables();

    renderFocus({ errors: {}, formError: STRING.Empty });

    expect(document.activeElement).toBe(document.body);
  });
});

describe("useReservationDepositSuccessFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it("focuses the success message on mount", () => {
    mountFocusables();

    renderHook(() => useReservationDepositSuccessFocus());

    expect(document.activeElement?.id).toBe(
      RESERVATION_DEPOSIT_FIELD_ID.SUCCESS
    );
  });
});

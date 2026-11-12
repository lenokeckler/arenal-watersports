import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_FIELD_ID } from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { useReservationChargeErrorFocus } from "../hooks/useReservationChargeErrorFocus";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";

const FOCUSABLE_IDS = [
  RESERVATION_CHARGE_FIELD_ID.AMOUNT,
  RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD,
  RESERVATION_CHARGE_FIELD_ID.ALERT,
];

const BOTH_FIELD_ERRORS: ReservationChargeErrors = {
  amount: VALIDATION.AMOUNT_REQUIRED,
  paymentMethod: VALIDATION.METHOD_REQUIRED,
};

const METHOD_ERROR: ReservationChargeErrors = {
  paymentMethod: VALIDATION.METHOD_REQUIRED,
};

interface FocusProps {
  errors: ReservationChargeErrors;
  formError: string;
}

const NO_PROBLEM: FocusProps = {
  errors: {},
  formError: STRING.Empty,
};

const mountFocusables = (): void => {
  FOCUSABLE_IDS.forEach((id) => {
    const element = document.createElement("input");
    element.id = id;
    document.body.append(element);
  });
};

const renderFocus = (initial: FocusProps) =>
  renderHook(
    ({ errors, formError }: FocusProps) =>
      useReservationChargeErrorFocus(errors, formError),
    { initialProps: initial }
  );

describe("useReservationChargeErrorFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it.each([
    {
      expected: RESERVATION_CHARGE_FIELD_ID.AMOUNT,
      props: {
        errors: BOTH_FIELD_ERRORS,
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD,
      props: {
        errors: METHOD_ERROR,
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: RESERVATION_CHARGE_FIELD_ID.ALERT,
      props: { errors: {}, formError: FEEDBACK.GENERIC },
    },
  ])("focuses $expected first", ({ expected, props }) => {
    mountFocusables();

    renderFocus(props);

    expect(document.activeElement?.id).toBe(expected);
  });

  it("focuses nothing when there is no problem", () => {
    mountFocusables();

    renderFocus(NO_PROBLEM);

    expect(document.activeElement).toBe(document.body);
  });

  it("moves focus when the errors change after mount", () => {
    mountFocusables();
    const { rerender } = renderFocus(NO_PROBLEM);

    rerender({
      errors: METHOD_ERROR,
      formError: STRING.Empty,
    });

    expect(document.activeElement?.id).toBe(
      RESERVATION_CHARGE_FIELD_ID.PAYMENT_METHOD
    );
  });
});

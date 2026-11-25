import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_FIRST_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import {
  RESERVATION_CHARGE_FIELD_ID,
  RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationChargeUi.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as VALIDATION } from "../constants/ReservationChargeValidationCopy.constants";
import { useReservationChargeErrorFocus } from "../hooks/useReservationChargeErrorFocus";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";

const FIRST_CHIP_ID =
  RESERVATION_CHARGE_PAYMENT_CHOICE_OPTION_ID(
    RESERVATION_CHARGE_FIRST_PAYMENT_CHOICE
  );

const FOCUSABLE_IDS = [
  RESERVATION_CHARGE_FIELD_ID.AMOUNT,
  RESERVATION_CHARGE_FIELD_ID.SECOND_AMOUNT,
  FIRST_CHIP_ID,
  RESERVATION_CHARGE_FIELD_ID.OTHER_PAYMENT_METHOD,
  RESERVATION_CHARGE_FIELD_ID.ALERT,
];

const SECOND_AND_METHOD_ERRORS: ReservationChargeErrors = {
  paymentChoice: VALIDATION.CHOICE_REQUIRED,
  secondAmount: VALIDATION.AMOUNT_REQUIRED,
};

const BOTH_FIELD_ERRORS: ReservationChargeErrors = {
  amount: VALIDATION.AMOUNT_REQUIRED,
  paymentChoice: VALIDATION.CHOICE_REQUIRED,
};

const METHOD_ERROR: ReservationChargeErrors = {
  paymentChoice: VALIDATION.CHOICE_REQUIRED,
};

const OTHER_METHOD_ERROR: ReservationChargeErrors = {
  otherPaymentMethod: VALIDATION.OTHER_REQUIRED,
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
      expected: RESERVATION_CHARGE_FIELD_ID.SECOND_AMOUNT,
      props: {
        errors: SECOND_AND_METHOD_ERRORS,
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: FIRST_CHIP_ID,
      props: {
        errors: METHOD_ERROR,
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected:
        RESERVATION_CHARGE_FIELD_ID.OTHER_PAYMENT_METHOD,
      props: {
        errors: OTHER_METHOD_ERROR,
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

    expect(document.activeElement?.id).toBe(FIRST_CHIP_ID);
  });
});

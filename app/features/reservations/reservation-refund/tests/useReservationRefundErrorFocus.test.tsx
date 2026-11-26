import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import {
  RESERVATION_REFUND_FIELD_ID,
  RESERVATION_REFUND_REASON_FOCUS_ID,
} from "../constants/ReservationRefundUi.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { useReservationRefundErrorFocus } from "../hooks/useReservationRefundErrorFocus";
import type { ReservationRefundErrors } from "../models/ReservationRefundErrors.interface";

const FOCUSABLE_IDS = [
  ...Object.values(RESERVATION_REFUND_FIELD_ID),
  RESERVATION_REFUND_REASON_FOCUS_ID,
];

const ALL_FIELD_ERRORS: ReservationRefundErrors = {
  amount: VALIDATION.AMOUNT_REQUIRED,
  otherReason: VALIDATION.OTHER_REQUIRED,
  reason: VALIDATION.REASON_REQUIRED,
};

interface FocusProps {
  errors: ReservationRefundErrors;
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
      useReservationRefundErrorFocus(errors, formError),
    { initialProps: initial }
  );

describe("useReservationRefundErrorFocus", () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it.each([
    {
      expected: RESERVATION_REFUND_FIELD_ID.AMOUNT,
      props: {
        errors: ALL_FIELD_ERRORS,
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: RESERVATION_REFUND_REASON_FOCUS_ID,
      props: {
        errors: {
          otherReason: VALIDATION.OTHER_REQUIRED,
          reason: VALIDATION.REASON_REQUIRED,
        },
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: RESERVATION_REFUND_FIELD_ID.OTHER_REASON,
      props: {
        errors: { otherReason: VALIDATION.OTHER_REQUIRED },
        formError: FEEDBACK.GENERIC,
      },
    },
    {
      expected: RESERVATION_REFUND_FIELD_ID.ALERT,
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
      errors: { reason: VALIDATION.REASON_REQUIRED },
      formError: STRING.Empty,
    });

    expect(document.activeElement?.id).toBe(
      RESERVATION_REFUND_REASON_FOCUS_ID
    );
  });

  it("focuses the amount again when an equal but new errors object arrives", () => {
    mountFocusables();
    const { rerender } = renderFocus({
      errors: { amount: VALIDATION.AMOUNT_REQUIRED },
      formError: STRING.Empty,
    });
    document
      .getElementById(RESERVATION_REFUND_FIELD_ID.AMOUNT)
      ?.blur();

    rerender({
      errors: { amount: VALIDATION.AMOUNT_REQUIRED },
      formError: STRING.Empty,
    });

    expect(document.activeElement?.id).toBe(
      RESERVATION_REFUND_FIELD_ID.AMOUNT
    );
  });
});

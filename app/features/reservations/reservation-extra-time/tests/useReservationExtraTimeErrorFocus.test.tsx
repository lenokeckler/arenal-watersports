import { renderHook } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import {
  FIRST_PAYMENT_CHOICE,
  STRING,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_OUTCOME_ORDER } from "../constants/ReservationExtraTimeOutcome.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID,
  RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID,
  RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID,
} from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "../constants/ReservationExtraTimeValidationCopy.constants";
import { useReservationExtraTimeErrorFocus } from "../hooks/useReservationExtraTimeErrorFocus";
import type { ReservationExtraTimeErrors } from "../models/ReservationExtraTimeErrors.interface";

const [FIRST_OUTCOME] =
  RESERVATION_EXTRA_TIME_OUTCOME_ORDER;
const OUTCOME_ID =
  RESERVATION_EXTRA_TIME_OUTCOME_OPTION_ID(FIRST_OUTCOME);
const CHIP_ID =
  RESERVATION_EXTRA_TIME_PAYMENT_CHOICE_OPTION_ID(
    FIRST_PAYMENT_CHOICE
  );
const FOCUSABLE_IDS = [
  OUTCOME_ID,
  FIELD_ID.AMOUNT,
  CHIP_ID,
  FIELD_ID.OTHER_PAYMENT_METHOD,
  FIELD_ID.ALERT,
];

const renderFocus = (
  errors: ReservationExtraTimeErrors,
  formError: string = STRING.Empty
) =>
  renderHook(() =>
    useReservationExtraTimeErrorFocus(errors, formError)
  );

describe("useReservationExtraTimeErrorFocus", () => {
  beforeEach(() => {
    FOCUSABLE_IDS.forEach((id) => {
      const input = document.createElement("input");
      input.id = id;
      document.body.append(input);
    });
  });

  afterEach(() => {
    document.body.replaceChildren();
  });

  it.each([
    [
      "the decision",
      { outcome: VALIDATION.OUTCOME_REQUIRED },
      OUTCOME_ID,
    ],
    [
      "the amount before the method",
      {
        amount: VALIDATION.AMOUNT_REQUIRED,
        paymentChoice: VALIDATION.CHOICE_REQUIRED,
      },
      FIELD_ID.AMOUNT,
    ],
    [
      "the first payment chip",
      { paymentChoice: VALIDATION.CHOICE_REQUIRED },
      CHIP_ID,
    ],
    [
      "the other method text",
      { otherPaymentMethod: VALIDATION.OTHER_REQUIRED },
      FIELD_ID.OTHER_PAYMENT_METHOD,
    ],
  ])("focuses %s", (_, errors, expectedId) => {
    renderFocus(errors);

    expect(document.activeElement?.id).toBe(expectedId);
  });

  it("focuses the alert for a form error", () => {
    renderFocus({}, FEEDBACK.GROUPS_OUT);

    expect(document.activeElement?.id).toBe(FIELD_ID.ALERT);
  });

  it("leaves the focus alone without problems", () => {
    renderFocus({});

    expect(document.activeElement).toBe(document.body);
  });
});

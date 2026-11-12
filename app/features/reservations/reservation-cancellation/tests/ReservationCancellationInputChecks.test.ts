import { describe, expect, it } from "vitest";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_LIMITS } from "../constants/ReservationCancellationLimits.constants";
import { isReservationCancellationInput } from "../utils/isReservationCancellationInput";
import { resolveReservationCancellationReasonError } from "../utils/resolveReservationCancellationReasonError";
import {
  MALFORMED_RESERVATION_ID,
  VALID_CANCELLATION_INPUT,
} from "./ReservationCancellation.constants";

const LIMIT_REASON = "a".repeat(
  RESERVATION_CANCELLATION_LIMITS.MAX_REASON_LENGTH
);
const EMOJI_LIMIT_REASON = "\u{1F600}".repeat(
  RESERVATION_CANCELLATION_LIMITS.MAX_REASON_LENGTH
);

describe("isReservationCancellationInput", () => {
  it("accepts a well formed input", () => {
    expect(
      isReservationCancellationInput(
        VALID_CANCELLATION_INPUT
      )
    ).toBe(true);
  });

  it.each([
    ["null", null],
    ["a string", "cancel"],
    [
      "a malformed id",
      {
        ...VALID_CANCELLATION_INPUT,
        reservationId: MALFORMED_RESERVATION_ID,
      },
    ],
    [
      "a token that is not a timestamp",
      {
        ...VALID_CANCELLATION_INPUT,
        expectedUpdatedAt: "nope",
      },
    ],
    [
      "a missing reason",
      { ...VALID_CANCELLATION_INPUT, reason: undefined },
    ],
    [
      "a numeric reason",
      { ...VALID_CANCELLATION_INPUT, reason: 7 },
    ],
  ])("refuses %s", (_, input) => {
    expect(isReservationCancellationInput(input)).toBe(
      false
    );
  });
});

describe("resolveReservationCancellationReasonError", () => {
  it.each(["", "   ", "\t\n"])(
    "asks for a reason when it is %j",
    (reason) => {
      expect(
        resolveReservationCancellationReasonError(reason)
      ).toBe(COPY.REASON_REQUIRED);
    }
  );

  it.each([
    ["a reason at the limit", LIMIT_REASON],
    ["a padded reason at the limit", ` ${LIMIT_REASON} `],
    ["an emoji reason at the limit", EMOJI_LIMIT_REASON],
  ])("accepts %s", (_, reason) => {
    expect(
      resolveReservationCancellationReasonError(reason)
    ).toBeUndefined();
  });

  it("refuses a reason over the limit", () => {
    expect(
      resolveReservationCancellationReasonError(
        `${LIMIT_REASON}a`
      )
    ).toBe(COPY.REASON_TOO_LONG);
  });
});

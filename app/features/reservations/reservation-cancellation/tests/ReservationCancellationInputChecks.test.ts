import { describe, expect, it } from "vitest";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_LIMITS } from "../constants/ReservationCancellationLimits.constants";
import { isReservationCancellationInput } from "../utils/isReservationCancellationInput";
import { resolveReservationCancellationReasonError } from "../utils/resolveReservationCancellationReasonError";
import {
  CANCELLATION_CAUSE,
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

  it("accepts a valid cause", () => {
    expect(
      isReservationCancellationInput({
        ...VALID_CANCELLATION_INPUT,
        cause: CANCELLATION_CAUSE,
      })
    ).toBe(true);
  });

  it("refuses an input without the cause key", () => {
    const withoutCause: Partial<
      typeof VALID_CANCELLATION_INPUT
    > = { ...VALID_CANCELLATION_INPUT };
    delete withoutCause.cause;

    expect(
      isReservationCancellationInput(withoutCause)
    ).toBe(false);
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
      "an unknown cause",
      { ...VALID_CANCELLATION_INPUT, cause: "fire" },
    ],
    [
      "a missing cause",
      { ...VALID_CANCELLATION_INPUT, cause: undefined },
    ],
    [
      "an empty cause",
      { ...VALID_CANCELLATION_INPUT, cause: "" },
    ],
    [
      "a cause with another casing",
      { ...VALID_CANCELLATION_INPUT, cause: "WEATHER" },
    ],
    [
      "a padded cause",
      { ...VALID_CANCELLATION_INPUT, cause: " weather " },
    ],
    [
      "a numeric cause",
      { ...VALID_CANCELLATION_INPUT, cause: 1 },
    ],
    [
      "an object cause",
      {
        ...VALID_CANCELLATION_INPUT,
        cause: { value: CANCELLATION_CAUSE },
      },
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

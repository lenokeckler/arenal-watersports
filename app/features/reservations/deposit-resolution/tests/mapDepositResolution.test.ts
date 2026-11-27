import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
  RESERVATION_STATUS,
} from "@/app/constants";
import { DEPOSIT_RESOLUTION_ERROR } from "../constants/DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import { DEPOSIT_RESOLUTION_REFUSALS } from "../constants/DepositResolutionRefusals.constants";
import { DEPOSIT_RESOLUTION_UNAVAILABLE_REASON as REASON } from "../constants/DepositResolutionUnavailableReason.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as VALIDATION } from "../constants/DepositResolutionValidationCopy.constants";
import { mapDepositResolution } from "../utils/mapDepositResolution";
import { mapDepositResolutionError } from "../utils/mapDepositResolutionError";
import { mapDepositResolutionRecorded } from "../utils/mapDepositResolutionRecorded";
import { resolveDepositResolutionUnavailableReason } from "../utils/resolveDepositResolutionUnavailableReason";
import {
  CLOSED_DEPOSIT,
  CLOSED_ROW,
  DAMAGE_REASON,
  PARTIAL_RECORD_ROW,
  RESOLVED_BY_NAME,
} from "./DepositResolution.constants";

const { MESSAGE } = DEPOSIT_RESOLUTION_ERROR;

describe("mapDepositResolution", () => {
  it("maps the deposit with its reservation", () => {
    expect(mapDepositResolution(CLOSED_ROW)).toEqual(
      CLOSED_DEPOSIT
    );
  });

  it("returns null when the reservation cannot be read", () => {
    expect(
      mapDepositResolution({
        ...CLOSED_ROW,
        reservation: null,
      })
    ).toBeNull();
  });
});

describe("mapDepositResolutionRecorded", () => {
  it("maps what went back and what the company keeps", () => {
    expect(
      mapDepositResolutionRecorded(PARTIAL_RECORD_ROW)
    ).toEqual({
      currency: CURRENCY_CODE.USD,
      depositAmount: 200,
      keptAmount: 100,
      reason: DAMAGE_REASON,
      resolvedByName: RESOLVED_BY_NAME,
      returnedAmount: 100,
      status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
    });
  });
});

describe("mapDepositResolutionError", () => {
  it("has a refusal row for every message the database can raise", () => {
    expect(
      DEPOSIT_RESOLUTION_REFUSALS.map(
        ({ message }) => message
      ).toSorted()
    ).toEqual(Object.values(MESSAGE).toSorted());
  });

  it.each(DEPOSIT_RESOLUTION_REFUSALS)(
    "maps the refusal $message",
    ({ errors, formError, message }) => {
      expect(
        mapDepositResolutionError(
          new Error(`P0001: ${message}`)
        )
      ).toEqual({
        ok: false,
        errors: { ...errors },
        formError,
      });
    }
  );

  it("puts a missing reason on the reason field", () => {
    expect(
      mapDepositResolutionError(
        new Error(MESSAGE.REASON_REQUIRED)
      )
    ).toMatchObject({
      errors: { reason: VALIDATION.REASON_REQUIRED },
    });
  });

  it("explains a deposit resolved in another tab", () => {
    expect(
      mapDepositResolutionError(
        new Error(MESSAGE.ALREADY_RESOLVED)
      )
    ).toMatchObject({
      formError: FEEDBACK.ALREADY_RESOLVED,
    });
  });

  it("rethrows an unknown failure and what is not an error", () => {
    const failure = new Error(
      "Unexpected resolution failure"
    );
    expect(() =>
      mapDepositResolutionError(failure)
    ).toThrow(failure);
    expect(() => mapDepositResolutionError("boom")).toThrow(
      "boom"
    );
  });
});

describe("resolveDepositResolutionUnavailableReason", () => {
  it.each([
    RESERVATION_STATUS.CLOSED,
    RESERVATION_STATUS.CANCELLED,
  ])(
    "lets a held deposit of a %s trip be resolved",
    (status) => {
      expect(
        resolveDepositResolutionUnavailableReason({
          ...CLOSED_DEPOSIT,
          reservationStatus: status,
        })
      ).toBeNull();
    }
  );

  it.each([
    RESERVATION_STATUS.SCHEDULED,
    RESERVATION_STATUS.DISPATCHED,
  ])("waits for a %s trip to close", (status) => {
    expect(
      resolveDepositResolutionUnavailableReason({
        ...CLOSED_DEPOSIT,
        reservationStatus: status,
      })
    ).toBe(REASON.TRIP_NOT_CLOSED);
  });

  it("names a deposit that was already resolved", () => {
    expect(
      resolveDepositResolutionUnavailableReason({
        ...CLOSED_DEPOSIT,
        reservationStatus: RESERVATION_STATUS.SCHEDULED,
        status: DEPOSIT_STATUS.RETURNED,
      })
    ).toBe(REASON.ALREADY_RESOLVED);
  });
});

import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY as COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { validateReservationPostponementDraft } from "../utils/validateReservationPostponementDraft";
import {
  COMPLETE_SCHEDULED_DRAFT,
  DISPATCHED_POSTPONEMENT,
  EMPTY_READING,
  FUEL_ITEM_ID,
  KILOMETERS_ITEM_ID,
  SCHEDULED_POSTPONEMENT,
  buildDispatchedDraft,
} from "./ReservationPostponementDraft.constants";

describe("validateReservationPostponementDraft", () => {
  it("accepts a complete scheduled draft", () => {
    expect(
      validateReservationPostponementDraft(
        SCHEDULED_POSTPONEMENT,
        COMPLETE_SCHEDULED_DRAFT
      )
    ).toBeNull();
  });

  it("accepts a dispatched draft at the usage floor with an empty tank", () => {
    expect(
      validateReservationPostponementDraft(
        DISPATCHED_POSTPONEMENT,
        buildDispatchedDraft(
          { fuelIn: "0", usageIn: "1250" },
          { fuelIn: "", usageIn: "8120" }
        )
      )
    ).toBeNull();
  });

  it("asks for a cause and every empty schedule field", () => {
    expect(
      validateReservationPostponementDraft(
        SCHEDULED_POSTPONEMENT,
        {
          ...COMPLETE_SCHEDULED_DRAFT,
          cause: null,
          date: "",
          time: "",
        }
      )
    ).toMatchObject({
      cause: COPY.CAUSE_REQUIRED,
      date: COPY.DATE_REQUIRED,
      readings: {},
      time: COPY.TIME_REQUIRED,
    });
  });

  it("asks for the reason of another cause", () => {
    expect(
      validateReservationPostponementDraft(
        SCHEDULED_POSTPONEMENT,
        {
          ...COMPLETE_SCHEDULED_DRAFT,
          cause: RESERVATION_POSTPONEMENT_CAUSE.OTHER,
          reason: " ",
        }
      )
    ).toMatchObject({ reason: COPY.REASON_REQUIRED });
  });

  it("asks for every missing reading of every unit", () => {
    expect(
      validateReservationPostponementDraft(
        DISPATCHED_POSTPONEMENT,
        buildDispatchedDraft(EMPTY_READING, EMPTY_READING)
      )?.readings
    ).toEqual({
      [FUEL_ITEM_ID]: {
        fuelIn: COPY.READING_FUEL_REQUIRED,
        usageIn: COPY.READING_USAGE_REQUIRED,
      },
      [KILOMETERS_ITEM_ID]: {
        usageIn: COPY.READING_USAGE_REQUIRED,
      },
    });
  });

  it("refuses a usage below the floor and an unreadable one", () => {
    expect(
      validateReservationPostponementDraft(
        DISPATCHED_POSTPONEMENT,
        buildDispatchedDraft(
          { fuelIn: "2", usageIn: "1249.99" },
          { fuelIn: "", usageIn: "-5" }
        )
      )?.readings
    ).toEqual({
      [FUEL_ITEM_ID]: {
        usageIn: COPY.READING_USAGE_BELOW_DEPARTURE,
      },
      [KILOMETERS_ITEM_ID]: {
        usageIn: COPY.READING_USAGE_INVALID,
      },
    });
  });

  it("treats a reading missing from the draft as empty", () => {
    expect(
      validateReservationPostponementDraft(
        DISPATCHED_POSTPONEMENT,
        COMPLETE_SCHEDULED_DRAFT
      )?.readings[KILOMETERS_ITEM_ID]
    ).toEqual({ usageIn: COPY.READING_USAGE_REQUIRED });
  });
});

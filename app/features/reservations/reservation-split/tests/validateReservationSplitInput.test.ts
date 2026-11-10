import { describe, expect, it } from "vitest";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import {
  validateReservationSplitDeparture,
  validateReservationSplitInput,
} from "../utils/validateReservationSplitInput";
import {
  VALID_DEPARTURE_INPUT,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";
import {
  DEPARTURE_ERROR_CASES,
  VALID_TIME_CASES,
} from "./validateReservationSplitInput.constants";

describe("validateReservationSplitDeparture", () => {
  it.each(DEPARTURE_ERROR_CASES)(
    "reports %s",
    (_name, overrides, expected) => {
      expect(
        validateReservationSplitDeparture({
          ...VALID_DEPARTURE_INPUT,
          ...overrides,
        })
      ).toEqual(expected);
    }
  );

  it.each(VALID_TIME_CASES)(
    "accepts the time %s",
    (time) => {
      expect(
        validateReservationSplitDeparture({
          ...VALID_DEPARTURE_INPUT,
          time,
        })
      ).toEqual({});
    }
  );
});

describe("validateReservationSplitInput", () => {
  it("returns null for a valid split", () => {
    expect(
      validateReservationSplitInput(VALID_SPLIT_INPUT)
    ).toBeNull();
  });

  it("asks for at least one new departure", () => {
    expect(
      validateReservationSplitInput({
        ...VALID_SPLIT_INPUT,
        departures: [],
      })
    ).toEqual({
      departures: [],
      original:
        RESERVATION_SPLIT_FEEDBACK_COPY.DEPARTURES_MIN,
    });
  });

  it("keeps the errors of each departure at its position", () => {
    expect(
      validateReservationSplitInput({
        ...VALID_SPLIT_INPUT,
        departures: [
          VALID_DEPARTURE_INPUT,
          { ...VALID_DEPARTURE_INPUT, time: "" },
        ],
      })
    ).toEqual({
      departures: [
        {},
        {
          time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_REQUIRED,
        },
      ],
    });
  });
});

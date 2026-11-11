import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import { RESERVATION_POSTPONEMENT_FIELD_ID } from "../constants/ReservationPostponementUi.constants";
import { RESERVATION_POSTPONEMENT_STRIPE_CLASSES } from "../styles/ReservationPostponementReadings.styles";
import { formatReservationPostponementUsage } from "../utils/formatReservationPostponementUsage";
import { resolveReservationPostponementFuelCaption } from "../utils/resolveReservationPostponementFuelCaption";
import { resolveReservationPostponementInvalidControlId } from "../utils/resolveReservationPostponementInvalidControlId";
import { resolveReservationPostponementReadingFieldId } from "../utils/resolveReservationPostponementReadingFieldId";
import { resolveReservationPostponementStripeClass } from "../utils/resolveReservationPostponementStripeClass";
import { POSTPONEMENT_ITEM_ID } from "./ReservationPostponementInput.constants";

const MAX = 8;
const ERROR = "error";

describe("resolveReservationPostponementFuelCaption", () => {
  it.each([
    [0, COPY.FUEL_EMPTY],
    [3, COPY.FUEL_LEVEL(3, MAX)],
    [MAX, COPY.FUEL_FULL],
  ])("names level %d", (level, caption) => {
    expect(
      resolveReservationPostponementFuelCaption(level, MAX)
    ).toBe(caption);
  });
});

describe("resolveReservationPostponementStripeClass", () => {
  it.each([
    [0, 0, RESERVATION_POSTPONEMENT_STRIPE_CLASSES.EMPTY],
    [0, 2, RESERVATION_POSTPONEMENT_STRIPE_CLASSES.LOW],
    [2, 2, RESERVATION_POSTPONEMENT_STRIPE_CLASSES.EMPTY],
    [2, 3, RESERVATION_POSTPONEMENT_STRIPE_CLASSES.FILLED],
    [
      7,
      MAX,
      RESERVATION_POSTPONEMENT_STRIPE_CLASSES.FILLED,
    ],
  ])(
    "paints stripe %d of level %d",
    (stripe, level, className) => {
      expect(
        resolveReservationPostponementStripeClass(
          stripe,
          level,
          MAX
        )
      ).toBe(className);
    }
  );
});

describe("formatReservationPostponementUsage", () => {
  it("adds the unit of each meter", () => {
    expect(
      formatReservationPostponementUsage(
        1245.5,
        "engine_hours"
      )
    ).toBe("1245.5 h");
    expect(
      formatReservationPostponementUsage(8120, "kilometers")
    ).toBe("8120 km");
  });
});

describe("resolveReservationPostponementInvalidControlId", () => {
  it("prefers the schedule fields in screen order", () => {
    expect(
      resolveReservationPostponementInvalidControlId({
        cause: ERROR,
        readings: {
          [POSTPONEMENT_ITEM_ID]: { fuelIn: ERROR },
        },
        time: ERROR,
      })
    ).toBe(RESERVATION_POSTPONEMENT_FIELD_ID.TIME);
  });

  it("falls back to the first refused reading", () => {
    expect(
      resolveReservationPostponementInvalidControlId({
        readings: {
          [POSTPONEMENT_ITEM_ID]: { usageIn: ERROR },
        },
      })
    ).toBe(
      resolveReservationPostponementReadingFieldId(
        POSTPONEMENT_ITEM_ID,
        "usageIn"
      )
    );
  });

  it("finds nothing when only the form was refused", () => {
    expect(
      resolveReservationPostponementInvalidControlId({
        readings: { [POSTPONEMENT_ITEM_ID]: {} },
      })
    ).toBeNull();
  });
});

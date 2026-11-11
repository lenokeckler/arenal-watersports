import { describe, expect, it } from "vitest";
import { CLOSE_GROUP_COPY } from "../constants/CloseGroupCopy.constants";
import { buildArrivalInstant } from "../utils/buildArrivalInstant";
import { buildReturnReadingRow } from "../utils/buildReturnReadingRow";
import { isArrivalAllowed } from "../utils/isArrivalAllowed";
import {
  ARRIVAL_CASES,
  CLOSE_NOW,
  EMPTY_CLOSE_DRAFT,
  MOTOR_UNIT,
  PLAIN_UNIT,
} from "./CloseGroupLogic.constants";

describe("buildArrivalInstant", () => {
  it.each(ARRIVAL_CASES)(
    "turns $time of Costa Rica into $iso",
    ({ iso, time }) => {
      expect(
        buildArrivalInstant(
          time,
          CLOSE_NOW
        )?.toISOString() ?? null
      ).toBe(iso);
    }
  );

  it("answers nothing for a time that is not a clock hour", () => {
    expect(
      buildArrivalInstant("25:99", CLOSE_NOW)
    ).toBeNull();
    expect(buildArrivalInstant("", CLOSE_NOW)).toBeNull();
  });
});

describe("isArrivalAllowed", () => {
  const departure = "2026-09-07T15:00:00.000Z";

  it("accepts an arrival between the departure and now", () => {
    expect(
      isArrivalAllowed(
        new Date("2026-09-07T15:30:00.000Z"),
        departure,
        CLOSE_NOW
      )
    ).toBe(true);
  });

  it("refuses an arrival before the departure", () => {
    expect(
      isArrivalAllowed(
        new Date("2026-09-07T14:59:00.000Z"),
        departure,
        CLOSE_NOW
      )
    ).toBe(false);
  });

  it("refuses an arrival in the future", () => {
    expect(
      isArrivalAllowed(
        new Date("2026-09-07T17:00:00.000Z"),
        departure,
        CLOSE_NOW
      )
    ).toBe(false);
  });
});

describe("buildReturnReadingRow", () => {
  it("is complete with the fuel and the hours of a motor unit", () => {
    const row = buildReturnReadingRow(MOTOR_UNIT, {
      ...EMPTY_CLOSE_DRAFT,
      fuel: "2",
      usage: "14,25",
    });

    expect(row).toMatchObject({
      fuelLevel: 2,
      isComplete: true,
      usageReading: 14.25,
    });
  });

  it("is not complete without the readings", () => {
    expect(
      buildReturnReadingRow(MOTOR_UNIT, EMPTY_CLOSE_DRAFT)
        .isComplete
    ).toBe(false);
  });

  it("refuses hours below the reading of the departure and says which", () => {
    const row = buildReturnReadingRow(MOTOR_UNIT, {
      ...EMPTY_CLOSE_DRAFT,
      fuel: "2",
      usage: "12",
    });

    expect(row.isComplete).toBe(false);
    expect(row.usageError).toBe(
      `${CLOSE_GROUP_COPY.USAGE_BELOW_PREFIX}${MOTOR_UNIT.usageOut}.`
    );
  });

  it("refuses a fuel above the gauge of the unit", () => {
    const row = buildReturnReadingRow(MOTOR_UNIT, {
      ...EMPTY_CLOSE_DRAFT,
      fuel: "9",
      usage: "14",
    });

    expect(row.isComplete).toBe(false);
    expect(row.fuelError).toBe(
      `${CLOSE_GROUP_COPY.FUEL_INVALID_PREFIX}${MOTOR_UNIT.fuelMax}.`
    );
  });

  it("takes no readings for a unit without motor and closes in order", () => {
    const row = buildReturnReadingRow(
      PLAIN_UNIT,
      EMPTY_CLOSE_DRAFT
    );

    expect(row).toMatchObject({
      damage: null,
      fuelLevel: null,
      isComplete: true,
      usageReading: null,
    });
  });

  it("needs the cause and the description when the unit came back damaged", () => {
    const row = buildReturnReadingRow(PLAIN_UNIT, {
      ...EMPTY_CLOSE_DRAFT,
      hasDamage: true,
    });

    expect(row.isComplete).toBe(false);
    expect(row.causeError).toBe(
      CLOSE_GROUP_COPY.CAUSE_REQUIRED
    );
    expect(row.descriptionError).toBe(
      CLOSE_GROUP_COPY.DESCRIPTION_REQUIRED
    );
  });

  it("builds the damage report with a trimmed description and the impact count", () => {
    const row = buildReturnReadingRow(PLAIN_UNIT, {
      ...EMPTY_CLOSE_DRAFT,
      cause: "collision",
      description: "  Cracked hull  ",
      hasDamage: true,
      impact: "2",
    });

    expect(row.isComplete).toBe(true);
    expect(row.damage).toEqual({
      cause: "collision",
      description: "Cracked hull",
      impactDelta: 2,
    });
  });

  it("defaults the impact count to zero and refuses text in it", () => {
    const base = {
      ...EMPTY_CLOSE_DRAFT,
      cause: "other",
      description: "Scratch",
      hasDamage: true,
    };

    expect(
      buildReturnReadingRow(PLAIN_UNIT, base).damage
        ?.impactDelta
    ).toBe(0);
    expect(
      buildReturnReadingRow(PLAIN_UNIT, {
        ...base,
        impact: "x",
      }).impactError
    ).toBe(CLOSE_GROUP_COPY.IMPACT_INVALID);
  });
});

import { describe, expect, it } from "vitest";
import { getCostaRicaDayRange } from "../getCostaRicaDayRange";
import {
  DAY_LENGTH_MILLISECONDS,
  EARLY_MORNING_COSTA_RICA,
  EXPECTED_LATE_NIGHT_DATE,
  EXPECTED_NEXT_DAY_DATE,
  EXPECTED_NEXT_DAY_END,
  INVALID_INSTANT,
  LATE_NIGHT_COSTA_RICA,
  NEXT_DAY_START,
} from "./getCostaRicaDayEdges.constants";

describe("getCostaRicaDayRange edges", () => {
  it("starts the next day exactly at the end of the previous one", () => {
    const range = getCostaRicaDayRange(NEXT_DAY_START);

    expect(range.date).toBe(EXPECTED_NEXT_DAY_DATE);
    expect(range.startsAt).toBe(
      NEXT_DAY_START.toISOString()
    );
    expect(range.endsAt).toBe(EXPECTED_NEXT_DAY_END);
  });

  it("keeps half past eleven at night on the same Costa Rica day", () => {
    const range = getCostaRicaDayRange(
      LATE_NIGHT_COSTA_RICA
    );

    expect(range.date).toBe(EXPECTED_LATE_NIGHT_DATE);
    expect(range.endsAt).toBe(NEXT_DAY_START.toISOString());
  });

  it("moves half past midnight to the next Costa Rica day", () => {
    const range = getCostaRicaDayRange(
      EARLY_MORNING_COSTA_RICA
    );

    expect(range.date).toBe(EXPECTED_NEXT_DAY_DATE);
  });

  it("spans exactly twenty-four hours", () => {
    const range = getCostaRicaDayRange(NEXT_DAY_START);

    expect(
      Date.parse(range.endsAt) - Date.parse(range.startsAt)
    ).toBe(DAY_LENGTH_MILLISECONDS);
  });

  it("throws on an invalid instant instead of returning a bogus range", () => {
    expect(() =>
      getCostaRicaDayRange(INVALID_INSTANT)
    ).toThrow(RangeError);
  });
});

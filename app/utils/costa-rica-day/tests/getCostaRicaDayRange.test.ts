import { describe, expect, it } from "vitest";
import { getCostaRicaDayRange } from "../getCostaRicaDayRange";
import {
  EXPECTED_LAST_DAY_OF_YEAR_RANGE,
  EXPECTED_LEAP_DAY_RANGE,
  EXPECTED_MIDDAY_RANGE,
  FIRST_INSTANT,
  LAST_DAY_OF_YEAR,
  LAST_MILLISECOND,
  LEAP_DAY,
  MIDDAY,
  MIDNIGHT_UTC,
} from "./getCostaRicaDayRange.constants";

describe("getCostaRicaDayRange", () => {
  it("returns the Costa Rica day containing the instant as a half-open UTC range", () => {
    expect(getCostaRicaDayRange(MIDDAY)).toEqual(
      EXPECTED_MIDDAY_RANGE
    );
  });

  it("keeps the evening in Costa Rica on the same day after UTC midnight", () => {
    expect(getCostaRicaDayRange(MIDNIGHT_UTC)).toEqual(
      EXPECTED_MIDDAY_RANGE
    );
  });

  it("includes the first instant of the day", () => {
    expect(getCostaRicaDayRange(FIRST_INSTANT)).toEqual(
      EXPECTED_MIDDAY_RANGE
    );
  });

  it("includes the last millisecond before the next day starts", () => {
    expect(getCostaRicaDayRange(LAST_MILLISECOND)).toEqual(
      EXPECTED_MIDDAY_RANGE
    );
  });

  it("ends the last day of the year on the first of January", () => {
    expect(getCostaRicaDayRange(LAST_DAY_OF_YEAR)).toEqual(
      EXPECTED_LAST_DAY_OF_YEAR_RANGE
    );
  });

  it("rolls a leap day over into March", () => {
    expect(getCostaRicaDayRange(LEAP_DAY)).toEqual(
      EXPECTED_LEAP_DAY_RANGE
    );
  });
});

import { describe, expect, it } from "vitest";
import { parseReservationPostponementReading } from "../utils/parseReservationPostponementReading";

describe("parseReservationPostponementReading", () => {
  it.each([
    ["0", 0],
    ["8120", 8120],
    ["1245.5", 1245.5],
    ["1245,25", 1245.25],
    [" 12 ", 12],
  ])("reads %j as %d", (value, expected) => {
    expect(parseReservationPostponementReading(value)).toBe(
      expected
    );
  });

  it.each([
    "",
    "-1",
    "abc",
    "1.234",
    "1e3",
    "1,2,3",
    "12.",
  ])("refuses %j", (value) => {
    expect(
      parseReservationPostponementReading(value)
    ).toBeNull();
  });
});

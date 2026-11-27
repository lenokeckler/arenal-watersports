import { describe, expect, it } from "vitest";
import { formatReservationExtraTimeMinutes } from "../utils/formatReservationExtraTimeMinutes";

const CASES = [
  { expected: "30 min", minutes: 30 },
  { expected: "1 h", minutes: 60 },
  { expected: "1 h 5 min", minutes: 65 },
  { expected: "0 min", minutes: 0 },
] as const;

describe("formatReservationExtraTimeMinutes", () => {
  it.each(CASES)(
    "formats $minutes minutes as $expected",
    ({ expected, minutes }) => {
      expect(
        formatReservationExtraTimeMinutes(minutes)
      ).toBe(expected);
    }
  );
});

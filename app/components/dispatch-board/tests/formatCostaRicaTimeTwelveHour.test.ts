import { describe, expect, it } from "vitest";
import { formatCostaRicaTimeTwelveHour } from "../utils/formatCostaRicaTimeTwelveHour";

describe("formatCostaRicaTimeTwelveHour", () => {
  it.each([
    ["2026-11-02T06:00:00.000Z", "12:00 AM"],
    ["2026-11-02T15:30:00.000Z", "9:30 AM"],
    ["2026-11-02T18:00:00.000Z", "12:00 PM"],
    ["2026-11-02T20:30:00.000Z", "2:30 PM"],
    ["2026-11-03T05:47:00.000Z", "11:47 PM"],
  ])(
    "writes %s as %s in Costa Rica",
    (instant, expected) => {
      expect(formatCostaRicaTimeTwelveHour(instant)).toBe(
        expected
      );
    }
  );
});

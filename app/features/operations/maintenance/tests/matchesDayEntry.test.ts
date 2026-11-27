import { describe, expect, it } from "vitest";
import { matchesDayEntry } from "../utils/matchesDayEntry";

const ENTRY = { date: "2026-11-20", unitId: "unit-1" };

describe("matchesDayEntry", () => {
  it("needs the day and, when chosen, the machine", () => {
    const day = ENTRY.date;

    expect(
      matchesDayEntry(ENTRY, { day, machineId: null })
    ).toBe(true);
    expect(
      matchesDayEntry(ENTRY, { day, machineId: "unit-2" })
    ).toBe(false);
    expect(
      matchesDayEntry(ENTRY, {
        day: "2026-11-21",
        machineId: null,
      })
    ).toBe(false);
  });
});

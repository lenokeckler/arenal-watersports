import { expect, it } from "vitest";
import { buildMovementCutoffMonth } from "../utils/buildMovementCutoffMonth";

it("starts 24 months back, counting the current month", () => {
  expect(
    buildMovementCutoffMonth(
      new Date("2026-11-11T12:00:00Z")
    )
  ).toBe("2024-12-01");
});

it("crosses the year boundary", () => {
  expect(
    buildMovementCutoffMonth(
      new Date("2026-01-05T12:00:00Z")
    )
  ).toBe("2024-02-01");
});

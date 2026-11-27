import { describe, expect, it } from "vitest";
import type { BoardUnitReceiveInput } from "../models/BoardUnitReceiveInput.interface";
import { buildBoardUnitReturn } from "../utils/buildBoardUnitReturn";
import { validateBoardUnitReceiveInput } from "../utils/validateBoardUnitReceiveInput";

const DAMAGED_INPUT: BoardUnitReceiveInput = {
  damageCause: "collision",
  damageDescription: " Golpe en la proa ",
  detailLater: false,
  fuelLevel: 2,
  fuelMax: 4,
  hasDamage: true,
  impactCount: 5,
  previousImpactCount: 2,
  unitId: "eeeeeeee-0000-0000-0000-000000000001",
  usageTotal: 12,
};

describe("receiving a damaged unit", () => {
  it("sends the chosen cause and only the new hits", () => {
    expect(buildBoardUnitReturn(DAMAGED_INPUT)).toEqual({
      damage: {
        cause: "collision",
        description: "Golpe en la proa",
        impact_delta: 3,
      },
      fuel: 2,
      maintenance: true,
      usage: 12,
    });
  });

  it("marks the report to be detailed later", () => {
    expect(
      buildBoardUnitReturn({
        ...DAMAGED_INPUT,
        damageCause: null,
        damageDescription: "",
        detailLater: true,
      })
    ).toMatchObject({
      damage: { impact_delta: 3, later: true },
      maintenance: true,
    });
  });

  it.each([
    { damageCause: null },
    { damageCause: "fire" as never },
    { damageDescription: "  " },
    { damageDescription: "a".repeat(301) },
    { detailLater: "yes" as never },
    { damageCause: "fire" as never, detailLater: true },
  ])("refuses a forged damage %#", (changes) => {
    expect(() =>
      validateBoardUnitReceiveInput({
        ...DAMAGED_INPUT,
        ...changes,
      })
    ).toThrow(RangeError);
  });

  it("accepts a damage left for later without cause", () => {
    expect(() =>
      validateBoardUnitReceiveInput({
        ...DAMAGED_INPUT,
        damageCause: null,
        damageDescription: "",
        detailLater: true,
      })
    ).not.toThrow();
  });
});

import { describe, expect, it } from "vitest";
import { buildInitialUnitSelection } from "../utils/buildInitialUnitSelection";
import {
  ASSIGNED_GROUP_FIXTURE,
  DISPATCH_FIXTURE_UNIT,
  QUANTITY_GROUP_FIXTURE,
  UNIT_GROUP_FIXTURE,
} from "./DispatchSheetGroup.fixtures";

const FIRST = DISPATCH_FIXTURE_UNIT.FIRST.unitId;
const SECOND = DISPATCH_FIXTURE_UNIT.SECOND.unitId;
const THIRD = DISPATCH_FIXTURE_UNIT.THIRD.unitId;
const ASSIGNED = DISPATCH_FIXTURE_UNIT.ASSIGNED.unitId;
const NOT_FREE = "bbbbbbbb-0000-4000-8000-000000000099";

describe("buildInitialUnitSelection", () => {
  it("starts empty when nothing was tapped on the board", () => {
    expect(
      buildInitialUnitSelection(UNIT_GROUP_FIXTURE, [])
    ).toEqual([]);
  });

  it("marks the units tapped on the board", () => {
    expect(
      buildInitialUnitSelection(UNIT_GROUP_FIXTURE, [
        FIRST,
        SECOND,
      ])
    ).toEqual([FIRST, SECOND]);
  });

  it("keeps only as many units as the reservation commits", () => {
    expect(
      buildInitialUnitSelection(UNIT_GROUP_FIXTURE, [
        FIRST,
        SECOND,
        THIRD,
      ])
    ).toEqual([FIRST, SECOND]);
  });

  it("ignores a unit that is no longer free", () => {
    expect(
      buildInitialUnitSelection(UNIT_GROUP_FIXTURE, [
        NOT_FREE,
        FIRST,
      ])
    ).toEqual([FIRST]);
  });

  it("keeps the units already assigned ahead of the tapped ones", () => {
    expect(
      buildInitialUnitSelection(ASSIGNED_GROUP_FIXTURE, [
        FIRST,
        SECOND,
      ])
    ).toEqual([ASSIGNED, FIRST]);
  });

  it("never repeats an assigned unit that was also tapped", () => {
    expect(
      buildInitialUnitSelection(ASSIGNED_GROUP_FIXTURE, [
        ASSIGNED,
        FIRST,
      ])
    ).toEqual([ASSIGNED, FIRST]);
  });

  it("selects nothing for a category counted by quantity", () => {
    expect(
      buildInitialUnitSelection(QUANTITY_GROUP_FIXTURE, [
        FIRST,
      ])
    ).toEqual([]);
  });
});

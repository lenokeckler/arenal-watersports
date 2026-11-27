import { describe, expect, it } from "vitest";
import { listExtraCompatibilityUnitIds } from "../utils/listExtraCompatibilityUnitIds";
import { listLinkedExtraCompatibilityUnitIds } from "../utils/listLinkedExtraCompatibilityUnitIds";
import {
  COMPATIBILITY_UNITS,
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

describe("listExtraCompatibilityUnitIds", () => {
  it("lists the id of every unit", () => {
    expect(
      listExtraCompatibilityUnitIds(
        COMPATIBILITY_UNITS.units
      )
    ).toStrictEqual([LINKED_UNIT_ID, FREE_UNIT_ID]);
  });
});

describe("listLinkedExtraCompatibilityUnitIds", () => {
  it("lists only the ids of the linked units", () => {
    expect(
      listLinkedExtraCompatibilityUnitIds(
        COMPATIBILITY_UNITS.units
      )
    ).toStrictEqual([LINKED_UNIT_ID]);
  });
});

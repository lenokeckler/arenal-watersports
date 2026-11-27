import { describe, expect, it } from "vitest";
import type { GridDragRect } from "../models/GridDragRect.interface";
import { resolveGridDragTargetIndex } from "../resolveGridDragTargetIndex";

const CARD_SIZE = 100;
const GAP = 10;
const NOT_FOUND_INDEX = -1;

const buildRect = (
  column: number,
  row: number
): GridDragRect => {
  const left = column * (CARD_SIZE + GAP);
  const top = row * (CARD_SIZE + GAP);

  return {
    bottom: top + CARD_SIZE,
    left,
    right: left + CARD_SIZE,
    top,
  };
};

const TWO_BY_TWO = [
  buildRect(0, 0),
  buildRect(1, 0),
  buildRect(0, 1),
  buildRect(1, 1),
];

describe("resolveGridDragTargetIndex", () => {
  it("returns no index for an empty grid", () => {
    expect(resolveGridDragTargetIndex([], 0, 0)).toBe(
      NOT_FOUND_INDEX
    );
  });

  it.each([
    [50, 50, 0],
    [160, 50, 1],
    [50, 160, 2],
    [160, 160, 3],
  ])(
    "picks the card under the point (%i, %i)",
    (x, y, expected) => {
      expect(
        resolveGridDragTargetIndex(TWO_BY_TWO, x, y)
      ).toBe(expected);
    }
  );

  it.each([
    [105, 160, 2],
    [400, 400, 3],
    [-50, -50, 0],
  ])(
    "picks the nearest card when the point (%i, %i) is in a gap or outside",
    (x, y, expected) => {
      expect(
        resolveGridDragTargetIndex(TWO_BY_TWO, x, y)
      ).toBe(expected);
    }
  );
});

import { describe, expect, it } from "vitest";
import { CARD_GRID_SIZE } from "../constants/CardGrid.constants";
import { resolveCardGridSize } from "../resolveCardGridSize";

describe("resolveCardGridSize", () => {
  it.each([
    [1, CARD_GRID_SIZE.PAIR],
    [2, CARD_GRID_SIZE.PAIR],
    [3, CARD_GRID_SIZE.TRIO],
    [4, CARD_GRID_SIZE.STANDARD],
  ])("sizes %i cards as %s", (count, size) => {
    expect(resolveCardGridSize(count, false)).toBe(size);
  });

  it("keeps the usual size on a paginated list", () => {
    expect(resolveCardGridSize(1, true)).toBe(
      CARD_GRID_SIZE.STANDARD
    );
  });
});

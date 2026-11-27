import { describe, expect, it } from "vitest";
import { moveBoardOrderItem } from "../moveBoardOrderItem";
import {
  BOARD_IDS,
  FIRST_INDEX,
  NOT_FOUND_INDEX,
  SECOND_INDEX,
  THIRD_INDEX,
} from "./boardLayout.constants";

const IDS = [
  BOARD_IDS.JET_SKI,
  BOARD_IDS.KAYAK,
  BOARD_IDS.PADDLE,
];

describe("moveBoardOrderItem", () => {
  it("moves an item later", () => {
    expect(
      moveBoardOrderItem(IDS, FIRST_INDEX, THIRD_INDEX)
    ).toEqual([
      BOARD_IDS.KAYAK,
      BOARD_IDS.PADDLE,
      BOARD_IDS.JET_SKI,
    ]);
  });

  it("moves an item earlier", () => {
    expect(
      moveBoardOrderItem(IDS, THIRD_INDEX, SECOND_INDEX)
    ).toEqual([
      BOARD_IDS.JET_SKI,
      BOARD_IDS.PADDLE,
      BOARD_IDS.KAYAK,
    ]);
  });

  it("returns the same list when the item does not move", () => {
    expect(
      moveBoardOrderItem(IDS, SECOND_INDEX, SECOND_INDEX)
    ).toBe(IDS);
  });

  it("returns the same list when an index is outside the list", () => {
    expect(
      moveBoardOrderItem(IDS, FIRST_INDEX, IDS.length)
    ).toBe(IDS);
    expect(
      moveBoardOrderItem(IDS, NOT_FOUND_INDEX, FIRST_INDEX)
    ).toBe(IDS);
  });

  it("does not change the list it receives", () => {
    moveBoardOrderItem(IDS, FIRST_INDEX, THIRD_INDEX);

    expect(IDS[FIRST_INDEX]).toBe(BOARD_IDS.JET_SKI);
  });
});

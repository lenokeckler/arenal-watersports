import { describe, expect, it } from "vitest";
import { orderByBoardOrder } from "../orderByBoardOrder";
import { BOARD_IDS } from "./boardLayout.constants";

const buildItems = (...ids: string[]) =>
  ids.map((id) => ({ id }));

const idsOf = (items: { id: string }[]) =>
  items.map((item) => item.id);

describe("orderByBoardOrder", () => {
  it("follows the saved order", () => {
    const items = buildItems(
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK,
      BOARD_IDS.SUP
    );

    expect(
      idsOf(
        orderByBoardOrder(items, [
          BOARD_IDS.SUP,
          BOARD_IDS.JET_SKI,
          BOARD_IDS.KAYAK,
        ])
      )
    ).toEqual([
      BOARD_IDS.SUP,
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK,
    ]);
  });

  it("ignores a saved category that no longer exists", () => {
    const items = buildItems(
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK
    );

    expect(
      idsOf(
        orderByBoardOrder(items, [
          BOARD_IDS.PADDLE,
          BOARD_IDS.KAYAK,
          BOARD_IDS.JET_SKI,
        ])
      )
    ).toEqual([BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI]);
  });

  it("keeps a category the saved order does not mention at the end, in its own order", () => {
    const items = buildItems(
      BOARD_IDS.JET_SKI,
      BOARD_IDS.PADDLE,
      BOARD_IDS.KAYAK,
      BOARD_IDS.SUP
    );

    expect(
      idsOf(orderByBoardOrder(items, [BOARD_IDS.KAYAK]))
    ).toEqual([
      BOARD_IDS.KAYAK,
      BOARD_IDS.JET_SKI,
      BOARD_IDS.PADDLE,
      BOARD_IDS.SUP,
    ]);
  });

  it("keeps the given order when nothing was saved", () => {
    const items = buildItems(
      BOARD_IDS.KAYAK,
      BOARD_IDS.JET_SKI
    );

    expect(idsOf(orderByBoardOrder(items, []))).toEqual([
      BOARD_IDS.KAYAK,
      BOARD_IDS.JET_SKI,
    ]);
  });

  it("uses the first mention of a repeated saved id", () => {
    const items = buildItems(
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK
    );

    expect(
      idsOf(
        orderByBoardOrder(items, [
          BOARD_IDS.KAYAK,
          BOARD_IDS.JET_SKI,
          BOARD_IDS.KAYAK,
        ])
      )
    ).toEqual([BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI]);
  });

  it("does not change the list it receives", () => {
    const items = buildItems(
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK
    );

    orderByBoardOrder(items, [
      BOARD_IDS.KAYAK,
      BOARD_IDS.JET_SKI,
    ]);

    expect(idsOf(items)).toEqual([
      BOARD_IDS.JET_SKI,
      BOARD_IDS.KAYAK,
    ]);
  });
});

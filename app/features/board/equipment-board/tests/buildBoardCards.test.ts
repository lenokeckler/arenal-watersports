import { describe, expect, it } from "vitest";
import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import {
  createKayakDouble,
  createKayakIndividual,
} from "./createKayakCategories";
import {
  BOARD_CATEGORY_NAME,
  BOARD_GROUP_NAME,
} from "./EquipmentBoardUtils.constants";

describe("buildBoardCards", () => {
  it("returns an empty list for empty input", () => {
    expect(buildBoardCards([])).toEqual([]);
  });

  it("passes an ungrouped category through as its own card", () => {
    const category = createBoardCategory();

    expect(buildBoardCards([category])).toEqual([
      {
        categories: [category],
        freeCount: category.freeCount,
        id: category.id,
        inUseCount: category.inUseCount,
        isGrouped: false,
        label: category.name,
        totalCount: category.totalCount,
      },
    ]);
  });

  it("orders cards by label and breaks ties by id", () => {
    const paddle = createBoardCategory({
      id: "b-paddle",
      name: BOARD_CATEGORY_NAME.PADDLE_BOARD,
    });
    const tourLate = createBoardCategory({
      id: "z-tour",
      name: BOARD_CATEGORY_NAME.TOUR,
    });
    const tourEarly = createBoardCategory({
      id: "a-tour",
      name: BOARD_CATEGORY_NAME.TOUR,
    });

    const cards = buildBoardCards([
      tourLate,
      paddle,
      tourEarly,
      createKayakDouble(),
      createKayakIndividual(),
    ]);

    expect(cards.map((card) => card.id)).toEqual([
      BOARD_GROUP_NAME.KAYAK_LOWER,
      paddle.id,
      tourEarly.id,
      tourLate.id,
    ]);
  });

  it("does not mutate the input", () => {
    const input = [
      createKayakIndividual(),
      createKayakDouble(),
      createBoardCategory(),
    ];
    const snapshot = structuredClone(input);

    buildBoardCards(input);

    expect(input).toEqual(snapshot);
  });

  it("keeps free plus in use within the total on every card", () => {
    const cards = buildBoardCards([
      createKayakDouble(),
      createKayakIndividual(),
      createBoardCategory(),
    ]);

    cards.forEach((card) => {
      expect(
        card.freeCount + card.inUseCount
      ).toBeLessThanOrEqual(card.totalCount);
    });
  });
});

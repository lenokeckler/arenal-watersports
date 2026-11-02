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

describe("buildBoardCards grouping", () => {
  it("sums two group members and keeps them intact", () => {
    const double = createKayakDouble();
    const individual = createKayakIndividual();

    const [card] = buildBoardCards([double, individual]);

    expect(card).toMatchObject({
      freeCount: double.freeCount + individual.freeCount,
      inUseCount: double.inUseCount + individual.inUseCount,
      isGrouped: true,
      totalCount: double.totalCount + individual.totalCount,
    });
    expect(card.categories).toEqual([double, individual]);
    expect(card.categories[0]).toBe(double);
    expect(card.categories[1]).toBe(individual);
  });

  it("merges group names that differ only by case", () => {
    const cards = buildBoardCards([
      createKayakDouble(),
      createKayakIndividual(),
    ]);

    expect(cards).toHaveLength(1);
    expect(cards[0].id).toBe(BOARD_GROUP_NAME.KAYAK_LOWER);
  });

  it("labels a group with the first member group name", () => {
    const [card] = buildBoardCards([
      createKayakIndividual(),
      createKayakDouble(),
    ]);

    expect(card.label).toBe(BOARD_GROUP_NAME.KAYAK_LOWER);
  });

  it("keeps null and blank group names as separate cards", () => {
    const ungrouped = createBoardCategory({
      id: "ungrouped",
      name: BOARD_CATEGORY_NAME.TOUR,
    });
    const blank = createBoardCategory({
      groupName: BOARD_GROUP_NAME.BLANK,
      id: "blank",
      name: BOARD_CATEGORY_NAME.PADDLE_BOARD,
    });
    const otherBlank = createBoardCategory({
      groupName: BOARD_GROUP_NAME.BLANK,
      id: "other-blank",
      name: BOARD_CATEGORY_NAME.KAYAK_DOUBLE,
    });

    const cards = buildBoardCards([
      ungrouped,
      blank,
      otherBlank,
    ]);

    expect(cards).toHaveLength(3);
    expect(cards.every((card) => !card.isGrouped)).toBe(
      true
    );
  });

  it("uses the category name for a single-member group", () => {
    const double = createKayakDouble();

    const [card] = buildBoardCards([double]);

    expect(card).toMatchObject({
      id: double.id,
      isGrouped: false,
      label: double.name,
    });
  });
});

import { describe, expect, it } from "vitest";
import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import {
  SPANISH_CATEGORY_NAME,
  SPANISH_CATEGORY_ORDER,
  SPANISH_GROUP_NAME,
} from "./EquipmentBoardLocale.constants";

describe("buildBoardCards with Spanish names", () => {
  it("orders accented and enye labels by es-CR collation", () => {
    const categories = [
      SPANISH_CATEGORY_NAME.O_PLAIN,
      SPANISH_CATEGORY_NAME.ENYE,
      SPANISH_CATEGORY_NAME.SECOND,
      SPANISH_CATEGORY_NAME.N_PLAIN,
      SPANISH_CATEGORY_NAME.ACCENTED_FIRST,
    ].map((name) =>
      createBoardCategory({ id: `id-${name}`, name })
    );

    const cards = buildBoardCards(categories);

    expect(cards.map((card) => card.label)).toEqual(
      SPANISH_CATEGORY_ORDER
    );
  });

  it("merges group names that differ only by enye case", () => {
    const cards = buildBoardCards([
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.ENYE_UPPER,
        id: "upper",
      }),
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.ENYE_LOWER,
        id: "lower",
      }),
    ]);

    expect(cards).toHaveLength(1);
    expect(cards[0].isGrouped).toBe(true);
  });

  it("merges group names that differ only by accented case", () => {
    const cards = buildBoardCards([
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.ACCENT_UPPER,
        id: "upper",
      }),
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.ACCENT_LOWER,
        id: "lower",
      }),
    ]);

    expect(cards).toHaveLength(1);
  });

  it("keeps an accented group apart from its unaccented spelling", () => {
    const cards = buildBoardCards([
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.ACCENT_LOWER,
        id: "accented",
      }),
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.PLAIN,
        id: "plain",
      }),
    ]);

    expect(cards).toHaveLength(2);
  });

  it("keeps a trailing-space group apart like the database rule", () => {
    const cards = buildBoardCards([
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.PADDED,
        id: "padded",
      }),
      createBoardCategory({
        groupName: SPANISH_GROUP_NAME.UNPADDED,
        id: "unpadded",
      }),
    ]);

    expect(cards).toHaveLength(2);
  });
});

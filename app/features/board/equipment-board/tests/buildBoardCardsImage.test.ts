import { describe, expect, it } from "vitest";
import { buildBoardCards } from "../utils/buildBoardCards";
import { BOARD_CATEGORY_IMAGE_PATH } from "./BoardCategoryImage.constants";
import { createBoardCategory } from "./createBoardCategory";
import {
  createKayakDouble,
  createKayakIndividual,
} from "./createKayakCategories";

describe("buildBoardCards image path", () => {
  it("keeps the image path of a plain category", () => {
    const [card] = buildBoardCards([
      createBoardCategory({
        imagePath: BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE,
      }),
    ]);

    expect(card.imagePath).toBe(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE
    );
  });

  it("has no image path when no member has an image", () => {
    const [card] = buildBoardCards([
      createKayakDouble(),
      createKayakIndividual(),
    ]);

    expect(card.imagePath).toBeNull();
  });

  it("uses the only member that has an image in a group", () => {
    const [card] = buildBoardCards([
      createKayakDouble(),
      {
        ...createKayakIndividual(),
        imagePath:
          BOARD_CATEGORY_IMAGE_PATH.KAYAK_INDIVIDUAL,
      },
    ]);

    expect(card.imagePath).toBe(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_INDIVIDUAL
    );
  });

  it("picks the first member by name when several have an image", () => {
    const [card] = buildBoardCards([
      {
        ...createKayakIndividual(),
        imagePath:
          BOARD_CATEGORY_IMAGE_PATH.KAYAK_INDIVIDUAL,
      },
      {
        ...createKayakDouble(),
        imagePath: BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE,
      },
    ]);

    expect(card.imagePath).toBe(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE
    );
  });
});

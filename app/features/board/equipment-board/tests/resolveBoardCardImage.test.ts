import { describe, expect, it } from "vitest";
import { buildBoardCards } from "../utils/buildBoardCards";
import { resolveBoardCardImage } from "../utils/resolveBoardCardImage";
import { BOARD_CATEGORY_IMAGE_PATH } from "./BoardCategoryImage.constants";
import { createBoardCategory } from "./createBoardCategory";
import { EDGE_CATEGORY_NAME } from "./EquipmentBoardEdge.constants";
import { JET_SKI_IMAGE_FILE } from "./EquipmentBoard.constants";

const buildCard = (
  overrides: Parameters<typeof createBoardCategory>[0]
) => buildBoardCards([createBoardCategory(overrides)])[0];

describe("resolveBoardCardImage", () => {
  it("uses the uploaded image before the static one", () => {
    const image = resolveBoardCardImage(
      buildCard({
        imagePath: BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE,
      })
    );

    expect(image?.source).toContain(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE
    );
    expect(image?.source).not.toContain(JET_SKI_IMAGE_FILE);
  });

  it("falls back to the static image of a known category", () => {
    const image = resolveBoardCardImage(buildCard({}));

    expect(image?.source).toContain(JET_SKI_IMAGE_FILE);
  });

  it("returns null for a category with neither image", () => {
    expect(
      resolveBoardCardImage(
        buildCard({ name: EDGE_CATEGORY_NAME.UNKNOWN })
      )
    ).toBeNull();
  });

  it("uses the uploaded image of a category with no static image", () => {
    const image = resolveBoardCardImage(
      buildCard({
        imagePath:
          BOARD_CATEGORY_IMAGE_PATH.KAYAK_INDIVIDUAL,
        name: EDGE_CATEGORY_NAME.UNKNOWN,
      })
    );

    expect(image?.source).toContain(
      BOARD_CATEGORY_IMAGE_PATH.KAYAK_INDIVIDUAL
    );
  });
});

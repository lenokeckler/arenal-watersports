import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import type { ImageProps } from "next/image";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { buildBoardCards } from "../utils/buildBoardCards";
import { BOARD_CATEGORY_IMAGE_PATH } from "./BoardCategoryImage.constants";
import { createBoardCategory } from "./createBoardCategory";
import { EDGE_CATEGORY_NAME } from "./EquipmentBoardEdge.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

const MOCK_IMAGE_PRIORITY = vi.hoisted(() => ({
  ATTRIBUTE: "data-priority",
  AUTO: "auto",
  HIGH: "high",
}));

vi.mock("next/image", async () => {
  const React = await import("react");

  return {
    default: ({ priority, ...imageProps }: ImageProps) =>
      React.createElement("img", {
        ...imageProps,
        [MOCK_IMAGE_PRIORITY.ATTRIBUTE]: priority
          ? MOCK_IMAGE_PRIORITY.HIGH
          : MOCK_IMAGE_PRIORITY.AUTO,
      }),
  };
});

const CARDS_WITH_UPLOADED_IMAGE_SECOND = buildBoardCards([
  createBoardCategory({
    id: "a-no-image",
    name: EDGE_CATEGORY_NAME.UNKNOWN,
  }),
  createBoardCategory({
    id: "b-uploaded",
    imagePath: BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE,
    name: EDGE_CATEGORY_NAME.SPARE,
  }),
]);

describe("BoardCard uploaded image", () => {
  it("shows the uploaded image of a category with no static image", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_UPLOADED_IMAGE_SECOND}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.getImageSource(
        page.getCard(EDGE_CATEGORY_NAME.SPARE)
      )
    ).toContain(BOARD_CATEGORY_IMAGE_PATH.KAYAK_DOUBLE);
  });

  it("keeps the placeholder on a card with no image at all", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_UPLOADED_IMAGE_SECOND}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.hasImage(
        page.getCard(EDGE_CATEGORY_NAME.UNKNOWN)
      )
    ).toBe(false);
  });

  it("prioritizes the first card that has an uploaded image", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_UPLOADED_IMAGE_SECOND}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.getImagePriority(
        page.getCard(EDGE_CATEGORY_NAME.SPARE)
      )
    ).toBe(MOCK_IMAGE_PRIORITY.HIGH);
  });
});

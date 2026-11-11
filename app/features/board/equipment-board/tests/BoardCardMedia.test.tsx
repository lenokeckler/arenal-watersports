import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import type { ImageProps } from "next/image";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  CARDS_WITH_UNKNOWN_CATEGORY,
  CARDS_WITH_UNKNOWN_CATEGORY_FIRST,
  EDGE_CATEGORY_NAME,
} from "./EquipmentBoardEdge.constants";
import {
  BOARD_CARDS,
  JET_SKI_IMAGE_FILE,
  JET_SKI_LABEL,
  KAYAK_IMAGE_FILE,
  KAYAK_LABEL,
  SAILING_ICON_TEXT,
} from "./EquipmentBoard.constants";
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

describe("BoardCard media", () => {
  it("marks every card as tracked per unit", () => {
    render(<EquipmentBoardContent cards={BOARD_CARDS} />);
    const page = createEquipmentBoardPage();

    page.getCards().forEach((card) => {
      expect(
        page.getText(
          card,
          EQUIPMENT_BOARD_COPY.PER_UNIT_CHIP
        )
      ).toBeInTheDocument();
    });
  });

  it("shows the product image of a known category and of a group by its name", () => {
    render(<EquipmentBoardContent cards={BOARD_CARDS} />);
    const page = createEquipmentBoardPage();

    expect(
      page.getImageSource(page.getCard(JET_SKI_LABEL))
    ).toContain(JET_SKI_IMAGE_FILE);
    expect(
      page.getImageSource(page.getCard(KAYAK_LABEL))
    ).toContain(KAYAK_IMAGE_FILE);
  });

  it("prioritizes only the first card image", () => {
    render(<EquipmentBoardContent cards={BOARD_CARDS} />);
    const page = createEquipmentBoardPage();

    expect(
      page.getImagePriority(page.getCard(JET_SKI_LABEL))
    ).toBe(MOCK_IMAGE_PRIORITY.HIGH);
    expect(
      page.getImagePriority(page.getCard(KAYAK_LABEL))
    ).toBe(MOCK_IMAGE_PRIORITY.AUTO);
  });

  it("shows a neutral placeholder instead of an image for a category with no known image", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_UNKNOWN_CATEGORY}
      />
    );
    const page = createEquipmentBoardPage();
    const card = page.getCard(EDGE_CATEGORY_NAME.UNKNOWN);

    expect(page.hasImage(card)).toBe(false);
    expect(
      page.getText(card, SAILING_ICON_TEXT)
    ).toBeInTheDocument();
  });

  it("prioritizes the first available image after a placeholder card", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_UNKNOWN_CATEGORY_FIRST}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.hasImage(
        page.getCard(EDGE_CATEGORY_NAME.UNKNOWN)
      )
    ).toBe(false);
    expect(
      page.getImagePriority(page.getCard(JET_SKI_LABEL))
    ).toBe(MOCK_IMAGE_PRIORITY.HIGH);
  });
});

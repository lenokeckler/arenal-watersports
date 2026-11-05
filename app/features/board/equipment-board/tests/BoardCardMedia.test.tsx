import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  CARDS_WITH_UNKNOWN_CATEGORY,
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
});

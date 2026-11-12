import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { resolveBoardCategoryPath } from "@/app/utils/board-paths/resolveBoardCategoryPath";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";
import {
  createKayakDouble,
  createKayakIndividual,
} from "./createKayakCategories";
import {
  BOARD_CARDS,
  CARD_COUNT_WITH_GROUP,
  HREF_ATTRIBUTE,
  JET_SKI_LABEL,
  KAYAK_LABEL,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

const renderContent = (
  cards: typeof BOARD_CARDS = BOARD_CARDS
) => {
  render(<EquipmentBoardContent cards={cards} />);

  return createEquipmentBoardPage();
};

describe("Board card links", () => {
  it("links a plain card to the units screen of its category", () => {
    const page = renderContent();

    expect(page.getCardLink(JET_SKI_LABEL)).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveBoardCategoryPath(createBoardCategory().id)
    );
  });

  it("links a group with one visible member to that member", () => {
    const individual = createKayakIndividual();
    const page = renderContent(
      buildBoardCards([individual])
    );

    expect(
      page.getCardLink(individual.name)
    ).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveBoardCategoryPath(individual.id)
    );
  });

  it("links a grouped card to its first member by name", () => {
    const page = renderContent();

    expect(page.getCardLink(KAYAK_LABEL)).toHaveAttribute(
      HREF_ATTRIBUTE,
      resolveBoardCategoryPath(createKayakDouble().id)
    );
  });

  it("gives every card exactly one link, inside its list item", () => {
    const page = renderContent();

    expect(page.getCardLinks()).toHaveLength(
      CARD_COUNT_WITH_GROUP
    );
    page.getCards().forEach((card) => {
      expect(page.getLinksIn(card)).toHaveLength(1);
    });
  });

  it("names each link after the card label", () => {
    const page = renderContent();

    expect(
      page.getCardLinks().map((link) => link.ariaLabel)
    ).toEqual([JET_SKI_LABEL, KAYAK_LABEL]);
  });

  it("reaches the first card link with the keyboard", async () => {
    const page = renderContent();

    await page.tab();

    expect(page.getCardLink(JET_SKI_LABEL)).toHaveFocus();
  });

  it("moves from one card link to the next with the keyboard", async () => {
    const page = renderContent();

    await page.tab();
    await page.tab();

    expect(page.getCardLink(KAYAK_LABEL)).toHaveFocus();
  });
});

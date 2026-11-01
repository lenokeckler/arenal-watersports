import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { resolveFreeOfTotalText } from "../utils/resolveFreeOfTotalText";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { createKayakDouble } from "./createKayakCategories";
import { DEFAULT_BOARD_CATEGORY } from "./EquipmentBoardUtils.constants";
import {
  ARIA_HIDDEN_TRUE,
  BOARD_CARDS,
  CARD_COUNT_WITH_GROUP,
  EXPECTED_BAR_WIDTHS,
  FIRST_MEMBER_LINE_INDEX,
  HEADING_LEVEL_TWO,
  JET_SKI_LABEL,
  KAYAK_LABEL,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

const renderContent = () => {
  render(<EquipmentBoardContent cards={BOARD_CARDS} />);

  return createEquipmentBoardPage();
};

describe("EquipmentBoardContent", () => {
  it("renders one card per board card in a named list", () => {
    const page = renderContent();

    expect(page.getCards()).toHaveLength(
      CARD_COUNT_WITH_GROUP
    );
    expect(
      page
        .getHeadings(HEADING_LEVEL_TWO)
        .map((heading) => heading.textContent)
    ).toEqual([JET_SKI_LABEL, KAYAK_LABEL]);
  });

  it("states free over total and the in-use sentence on a plain card", () => {
    const page = renderContent();
    const card = page.getCard(JET_SKI_LABEL);

    expect(
      page.getText(
        card,
        resolveFreeOfTotalText(
          DEFAULT_BOARD_CATEGORY.freeCount,
          DEFAULT_BOARD_CATEGORY.totalCount
        )
      )
    ).toBeInTheDocument();
    expect(
      page.getText(
        card,
        EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
          DEFAULT_BOARD_CATEGORY.inUseCount,
          DEFAULT_BOARD_CATEGORY.totalCount
        )
      )
    ).toBeInTheDocument();
    expect(page.queryMemberList(card)).toBeNull();
  });

  it("lists each member category inside the grouped card with its own counts", () => {
    const page = renderContent();
    const kayakDouble = createKayakDouble();
    const lines = page.getMemberLines(
      page.getCard(KAYAK_LABEL)
    );

    expect(lines).toHaveLength(CARD_COUNT_WITH_GROUP);
    expect(
      page.getText(
        lines[FIRST_MEMBER_LINE_INDEX],
        EQUIPMENT_BOARD_COPY.IN_USE_OF_TOTAL(
          kayakDouble.inUseCount,
          kayakDouble.totalCount
        )
      )
    ).toBeInTheDocument();
  });

  it("draws a decorative bar sized by the share free", () => {
    const page = renderContent();

    expect(
      page.getBarWidth(page.getCard(JET_SKI_LABEL))
    ).toBe(EXPECTED_BAR_WIDTHS.JET_SKI);
    expect(
      page.getBarWidth(page.getCard(KAYAK_LABEL))
    ).toBe(EXPECTED_BAR_WIDTHS.KAYAK);
    expect(
      page.isBarHidden(page.getCard(JET_SKI_LABEL))
    ).toBe(ARIA_HIDDEN_TRUE);
  });
});

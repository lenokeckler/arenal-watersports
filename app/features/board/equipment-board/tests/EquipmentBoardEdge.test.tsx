import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { BOARD_GROUP_NAME } from "./EquipmentBoardUtils.constants";
import {
  CARDS_WITH_DUPLICATE_NAMES,
  CARDS_WITH_LONG_NAME,
  CARDS_WITH_NONE_FREE_ALL_FREE_AND_EMPTY,
  CARDS_WITH_ZERO_TOTAL_MEMBER,
  EDGE_BAR_WIDTHS,
  EDGE_CATEGORY_NAME,
  SINGULAR_FREE_PATTERN,
  ZERO_FREE_PATTERN,
} from "./EquipmentBoardEdge.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

describe("EquipmentBoardContent edge cases", () => {
  it("keeps a zero-total member listed with 0 libres without moving the group bar", async () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_ZERO_TOTAL_MEMBER}
      />
    );
    const page = createEquipmentBoardPage();
    const card = page.getCard(BOARD_GROUP_NAME.KAYAK);

    await page.toggleCard(card);
    const [, spareLine] = page.getMemberLines(card);

    expect(spareLine).toHaveTextContent(
      EDGE_CATEGORY_NAME.SPARE
    );
    expect(spareLine.textContent).toMatch(
      ZERO_FREE_PATTERN
    );
    expect(page.getBarWidth(card)).toBe(
      EDGE_BAR_WIDTHS.HALF
    );
  });

  it("lists two members that share a name as two separate lines", async () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_DUPLICATE_NAMES}
      />
    );
    const page = createEquipmentBoardPage();
    const card = page.getCard(BOARD_GROUP_NAME.KAYAK);

    await page.toggleCard(card);
    const lines = page.getMemberLines(card);

    expect(lines).toHaveLength(
      CARDS_WITH_DUPLICATE_NAMES[0].categories.length
    );
    lines.forEach((line) => {
      expect(line.textContent).toMatch(
        SINGULAR_FREE_PATTERN
      );
    });
  });

  it("renders a very long category name whole in its card heading", () => {
    render(
      <EquipmentBoardContent cards={CARDS_WITH_LONG_NAME} />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.getCard(EDGE_CATEGORY_NAME.LONG)
    ).toBeInTheDocument();
  });

  it("empties the bar when nothing is free, fills it when everything is free and leaves it empty for a zero total", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_NONE_FREE_ALL_FREE_AND_EMPTY}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.getBarWidth(
        page.getCard(EDGE_CATEGORY_NAME.NONE_FREE)
      )
    ).toBe(EDGE_BAR_WIDTHS.EMPTY);
    expect(
      page.getBarWidth(
        page.getCard(EDGE_CATEGORY_NAME.ALL_FREE)
      )
    ).toBe(EDGE_BAR_WIDTHS.FULL);
    expect(
      page.getBarWidth(
        page.getCard(EDGE_CATEGORY_NAME.SPARE_GROUP_LEADER)
      )
    ).toBe(EDGE_BAR_WIDTHS.EMPTY);
  });
});

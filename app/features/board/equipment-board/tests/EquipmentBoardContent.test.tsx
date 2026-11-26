import { BOARD_UNIT_FILTER } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import { resolveFreeOfTotalText } from "../utils/resolveFreeOfTotalText";
import { createKayakDouble } from "./createKayakCategories";
import { DEFAULT_BOARD_CATEGORY } from "./EquipmentBoardUtils.constants";
import {
  BOARD_CARDS,
  CARD_COUNT_WITH_GROUP,
  EN_USO_TEXT,
  HEADING_LEVEL_TWO,
  JET_SKI_LABEL,
  KAYAK_LABEL,
  KAYAK_SUMMED,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

const renderContent = () => {
  render(
    <EquipmentBoardContent
      cards={BOARD_CARDS}
      filter={BOARD_UNIT_FILTER.ALL}
    />
  );

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

  it("states free over total on a plain card and no in-use text", () => {
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
    expect(page.queryMemberList(card)).toBeNull();
    expect(page.getCardText(card)).not.toContain(
      EN_USO_TEXT
    );
  });

  it("renders the grouped card like the others, with the summed free over total, no button and no member names", () => {
    const page = renderContent();
    const kayakCard = page.getCard(KAYAK_LABEL);

    expect(
      page.getText(
        kayakCard,
        resolveFreeOfTotalText(
          KAYAK_SUMMED.FREE,
          KAYAK_SUMMED.TOTAL
        )
      )
    ).toBeInTheDocument();
    expect(page.queryButton(kayakCard)).toBeNull();
    expect(page.queryMemberList(kayakCard)).toBeNull();
    expect(page.getCardText(kayakCard)).not.toContain(
      createKayakDouble().name
    );
  });
});

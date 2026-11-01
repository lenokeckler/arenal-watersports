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
  EN_USO_TEXT,
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

  it("lists each member category inside the grouped card with its name and free count once expanded", async () => {
    const page = renderContent();
    const kayakDouble = createKayakDouble();
    const kayakCard = page.getCard(KAYAK_LABEL);

    await page.toggleCard(kayakCard);
    const lines = page.getMemberLines(kayakCard);

    expect(lines).toHaveLength(CARD_COUNT_WITH_GROUP);
    expect(
      page.getCardText(lines[FIRST_MEMBER_LINE_INDEX])
    ).toBe(
      `${kayakDouble.name}${kayakDouble.freeCount} ${EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL}`
    );
  });

  it("keeps the member lines out of the grouped card until it is toggled, and hides them again", async () => {
    const page = renderContent();
    const kayakCard = page.getCard(KAYAK_LABEL);

    expect(page.isToggleExpanded(kayakCard)).toBe(false);
    expect(page.queryMemberList(kayakCard)).toBeNull();

    await page.toggleCard(kayakCard);

    expect(page.isToggleExpanded(kayakCard)).toBe(true);
    expect(page.getMemberLines(kayakCard)).toHaveLength(
      CARD_COUNT_WITH_GROUP
    );

    await page.toggleCard(kayakCard);

    expect(page.isToggleExpanded(kayakCard)).toBe(false);
    expect(page.queryMemberList(kayakCard)).toBeNull();
  });

  it("names the toggle after the group and gives plain cards no button", () => {
    const page = renderContent();

    expect(
      page.getToggle(page.getCard(KAYAK_LABEL))
    ).toHaveAccessibleName(KAYAK_LABEL);
    expect(
      page.queryToggle(page.getCard(JET_SKI_LABEL))
    ).toBeNull();
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

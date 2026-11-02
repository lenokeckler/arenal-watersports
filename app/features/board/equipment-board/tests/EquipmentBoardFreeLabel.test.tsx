import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import { readBoardCategories } from "@/app/services/board";
import EquipmentBoard from "../EquipmentBoard";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { DEFAULT_BOARD_CATEGORY } from "./EquipmentBoardUtils.constants";
import {
  DEFAULT_BOARD_ROW,
  FREE_LABEL_CARD_NAMES,
  FREE_LABEL_COUNTS,
  FREE_LABEL_TOTAL,
  JET_SKI_LABEL,
  NO_FREE_ROW,
  SINGLE_FREE_ROW,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

vi.mock("@/app/services/board", () => ({
  readBoardCategories: vi.fn(),
}));

describe("EquipmentBoard free label", () => {
  beforeEach(() => {
    vi.mocked(readBoardCategories).mockResolvedValue([
      SINGLE_FREE_ROW,
      NO_FREE_ROW,
      DEFAULT_BOARD_ROW,
    ]);
  });

  const renderCardText = async (label: string) => {
    render(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    return page.getCardText(page.getCard(label));
  };

  it("writes the singular for one free unit", async () => {
    expect(
      await renderCardText(FREE_LABEL_CARD_NAMES.SINGLE)
    ).toContain(
      EQUIPMENT_BOARD_COPY.FREE_OF_TOTAL(
        FREE_LABEL_COUNTS.ONE,
        FREE_LABEL_TOTAL,
        EQUIPMENT_BOARD_COPY.FREE_LABEL_SINGULAR
      )
    );
  });

  it("writes the plural for zero free units", async () => {
    expect(
      await renderCardText(FREE_LABEL_CARD_NAMES.NONE)
    ).toContain(
      EQUIPMENT_BOARD_COPY.FREE_OF_TOTAL(
        FREE_LABEL_COUNTS.ZERO,
        FREE_LABEL_TOTAL,
        EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL
      )
    );
  });

  it("writes the plural for several free units", async () => {
    expect(await renderCardText(JET_SKI_LABEL)).toContain(
      EQUIPMENT_BOARD_COPY.FREE_OF_TOTAL(
        DEFAULT_BOARD_CATEGORY.freeCount,
        DEFAULT_BOARD_CATEGORY.totalCount,
        EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL
      )
    );
  });
});

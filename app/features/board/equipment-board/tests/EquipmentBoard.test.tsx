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
import { resolveFreeOfTotalText } from "../utils/resolveFreeOfTotalText";
import { BOARD_CATEGORY_NAME } from "./EquipmentBoardUtils.constants";
import {
  BOARD_ROWS_WITH_GROUP,
  CARD_COUNT_WITH_GROUP,
  DEFAULT_BOARD_ROW,
  HEADING_LEVEL_ONE,
  JET_SKI_LABEL,
  KAYAK_LABEL,
  KAYAK_SUMMED,
  PADDLE_BOARD_ROW,
  READ_FAILURE_MESSAGE,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

vi.mock("@/app/services/board", () => ({
  readBoardCategories: vi.fn(),
}));

describe("EquipmentBoard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(readBoardCategories).mockResolvedValue(
      BOARD_ROWS_WITH_GROUP
    );
  });

  it("renders one card per category, merging the grouped ones, under a titled main landmark", async () => {
    render(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(page.getMain()).toBeInTheDocument();
    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.getCards()).toHaveLength(
      CARD_COUNT_WITH_GROUP
    );
    expect(page.getCard(JET_SKI_LABEL)).toBeInTheDocument();
  });

  it("shows the grouped card with the summed totals and each member with its own counts", async () => {
    render(await EquipmentBoard());
    const page = createEquipmentBoardPage();
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
    expect(page.getMemberLines(kayakCard)).toHaveLength(
      CARD_COUNT_WITH_GROUP
    );
  });

  it("shows a group with a single visible member as a plain card with the category name", async () => {
    vi.mocked(readBoardCategories).mockResolvedValue([
      PADDLE_BOARD_ROW,
    ]);
    render(await EquipmentBoard());
    const page = createEquipmentBoardPage();
    const card = page.getCard(
      BOARD_CATEGORY_NAME.PADDLE_BOARD
    );

    expect(page.getCards()).toHaveLength(1);
    expect(page.queryMemberList(card)).toBeNull();
  });

  it("shows the empty state and no grid when there is no reservable equipment", async () => {
    vi.mocked(readBoardCategories).mockResolvedValue([]);
    render(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(
      page.getPageText(EQUIPMENT_BOARD_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(page.queryGrid()).toBeNull();
  });

  it("shows no empty state when there are cards", async () => {
    vi.mocked(readBoardCategories).mockResolvedValue([
      DEFAULT_BOARD_ROW,
    ]);
    render(await EquipmentBoard());

    expect(
      createEquipmentBoardPage().queryText(
        EQUIPMENT_BOARD_COPY.EMPTY_TITLE
      )
    ).toBeNull();
  });

  it("lets a failed read reach the error boundary instead of showing an empty board", async () => {
    vi.mocked(readBoardCategories).mockRejectedValue(
      new Error(READ_FAILURE_MESSAGE)
    );

    await expect(EquipmentBoard()).rejects.toThrow(
      READ_FAILURE_MESSAGE
    );
  });
});

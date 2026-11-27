import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { act } from "react";
import {
  BOARD_LAYOUT_COLUMNS,
  DEFAULT_BOARD_LAYOUT,
} from "@/app/constants";
import { readBoardCategories } from "@/app/services/board";
import { boardLayoutActions, store } from "@/app/store";
import { persistBoardLayout } from "@/app/utils/board-layout/persistBoardLayout";
import EquipmentBoard from "../EquipmentBoard";
import {
  EQUIPMENT_BOARD_GRID_ITEM_BY_COLUMNS_CLASS,
  EQUIPMENT_BOARD_GRID_ITEM_CLASS,
} from "../styles/EquipmentBoard.styles";
import { HEADING_LEVEL_TWO } from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";
import {
  LAYOUT_BOARD_ROWS,
  LAYOUT_CARD_ID_BY_LABEL,
  LAYOUT_LABELS,
  REMOVED_CATEGORY_ID,
} from "./EquipmentBoardLayout.constants";
import { renderWithBoardStore } from "./renderWithBoardStore";

vi.mock(
  "@/app/components/board-realtime/BoardRealtime",
  () => ({
    default: () => null,
  })
);

vi.mock("@/app/services/board", () => ({
  readBoardCategories: vi.fn(),
}));

const getCardLabels = (
  page: ReturnType<typeof createEquipmentBoardPage>
) =>
  page
    .getHeadings(HEADING_LEVEL_TWO)
    .map((heading) => heading.textContent);

describe("EquipmentBoard layout on the device", () => {
  beforeEach(() => {
    vi.mocked(readBoardCategories).mockResolvedValue(
      LAYOUT_BOARD_ROWS
    );
  });

  afterEach(() => {
    window.localStorage.clear();
    act(() => {
      store.dispatch(
        boardLayoutActions.setPreference(
          DEFAULT_BOARD_LAYOUT
        )
      );
    });
  });

  it("keeps the alphabetical order and the responsive columns when nothing was saved", async () => {
    renderWithBoardStore(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(getCardLabels(page)).toEqual([
      LAYOUT_LABELS.JET_SKI,
      LAYOUT_LABELS.KAYAK,
      LAYOUT_LABELS.PADDLE_BOARD,
    ]);
    expect(page.getCards()[0]).toHaveClass(
      EQUIPMENT_BOARD_GRID_ITEM_CLASS
    );
  });

  it("shows the categories in the order saved on this device", async () => {
    persistBoardLayout({
      columns: null,
      order: [
        LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.PADDLE_BOARD],
        LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.KAYAK],
        LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.JET_SKI],
      ],
    });

    renderWithBoardStore(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(getCardLabels(page)).toEqual([
      LAYOUT_LABELS.PADDLE_BOARD,
      LAYOUT_LABELS.KAYAK,
      LAYOUT_LABELS.JET_SKI,
    ]);
  });

  it("ignores a saved category that is gone and keeps the unmentioned ones at the end", async () => {
    persistBoardLayout({
      columns: null,
      order: [
        REMOVED_CATEGORY_ID,
        LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.PADDLE_BOARD],
      ],
    });

    renderWithBoardStore(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(getCardLabels(page)).toEqual([
      LAYOUT_LABELS.PADDLE_BOARD,
      LAYOUT_LABELS.JET_SKI,
      LAYOUT_LABELS.KAYAK,
    ]);
  });

  it("uses the number of cards per row saved on this device", async () => {
    persistBoardLayout({
      columns: BOARD_LAYOUT_COLUMNS.THREE,
      order: [],
    });

    renderWithBoardStore(await EquipmentBoard());
    const page = createEquipmentBoardPage();

    expect(page.getCards()[0]).toHaveClass(
      EQUIPMENT_BOARD_GRID_ITEM_BY_COLUMNS_CLASS[
        BOARD_LAYOUT_COLUMNS.THREE
      ]
    );
  });

  it("publishes its cards for the panel and withdraws them when it unmounts", async () => {
    const { unmount } = renderWithBoardStore(
      await EquipmentBoard()
    );

    expect(
      store
        .getState()
        .boardLayout.cards.map(({ label }) => label)
    ).toEqual([
      LAYOUT_LABELS.JET_SKI,
      LAYOUT_LABELS.KAYAK,
      LAYOUT_LABELS.PADDLE_BOARD,
    ]);

    unmount();

    expect(store.getState().boardLayout.cards).toEqual([]);
  });
});

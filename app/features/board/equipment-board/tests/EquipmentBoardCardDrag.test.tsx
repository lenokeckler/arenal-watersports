import { act, fireEvent } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DEFAULT_BOARD_LAYOUT } from "@/app/constants";
import { readBoardCategories } from "@/app/services/board";
import { boardLayoutActions, store } from "@/app/store";
import { readStoredBoardLayout } from "@/app/utils/board-layout/readStoredBoardLayout";
import EquipmentBoard from "../EquipmentBoard";
import { BOARD_CARD_DRAG } from "../constants/BoardCardDrag.constants";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { HEADING_LEVEL_TWO } from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";
import {
  LAYOUT_BOARD_ROWS,
  LAYOUT_CARD_ID_BY_LABEL,
  LAYOUT_LABELS,
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

const CARD_SIZE = 100;
const CARD_STEP = 110;
const CARD_CENTER = 50;
const POINTER_ID = 1;
const SMALL_MOVE_PX = 4;
const LAST_CARD_INDEX = 2;
const MOUSE = BOARD_CARD_DRAG.MOUSE_POINTER_TYPE;
const TOUCH = "touch";

const centerOf = (index: number): number =>
  index * CARD_STEP + CARD_CENTER;

const layOutCardsInOneRow = (): void => {
  vi.spyOn(
    HTMLElement.prototype,
    "getBoundingClientRect"
  ).mockImplementation(function (this: HTMLElement) {
    const siblings = this.parentElement
      ? Array.from(this.parentElement.children)
      : [];
    const left = siblings.indexOf(this) * CARD_STEP;

    return {
      bottom: CARD_SIZE,
      height: CARD_SIZE,
      left,
      right: left + CARD_SIZE,
      toJSON: () => ({}),
      top: 0,
      width: CARD_SIZE,
      x: left,
      y: 0,
    };
  });
};

const getCardLabels = (
  page: ReturnType<typeof createEquipmentBoardPage>
) =>
  page
    .getHeadings(HEADING_LEVEL_TWO)
    .map((heading) => heading.textContent);

const pointer = (
  pointerType: string,
  index: number,
  offset = 0
) => ({
  button: BOARD_CARD_DRAG.PRIMARY_POINTER_BUTTON,
  clientX: centerOf(index) + offset,
  clientY: CARD_CENTER,
  pointerId: POINTER_ID,
  pointerType,
});

const renderBoard = async () => {
  renderWithBoardStore(await EquipmentBoard());
  return createEquipmentBoardPage();
};

describe("EquipmentBoard card drag", () => {
  beforeEach(() => {
    vi.mocked(readBoardCategories).mockResolvedValue(
      LAYOUT_BOARD_ROWS
    );
    layOutCardsInOneRow();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    window.localStorage.clear();
    act(() => {
      store.dispatch(
        boardLayoutActions.setPreference(
          DEFAULT_BOARD_LAYOUT
        )
      );
    });
  });

  it("tells how to reorder the cards", async () => {
    const page = await renderBoard();

    expect(page.getCards()).not.toHaveLength(0);
    expect(document.body.textContent).toContain(
      EQUIPMENT_BOARD_COPY.DRAG_HINT
    );
  });

  it("moves a card with the mouse and saves the order on the device", async () => {
    const page = await renderBoard();
    const firstCard = page.getCards()[0];

    fireEvent.pointerDown(firstCard, pointer(MOUSE, 0));
    fireEvent.pointerMove(
      firstCard,
      pointer(
        MOUSE,
        0,
        BOARD_CARD_DRAG.MOVE_TOLERANCE_PX + 1
      )
    );
    fireEvent.pointerMove(
      firstCard,
      pointer(MOUSE, LAST_CARD_INDEX)
    );
    fireEvent.pointerUp(
      firstCard,
      pointer(MOUSE, LAST_CARD_INDEX)
    );

    expect(getCardLabels(page)).toEqual([
      LAYOUT_LABELS.KAYAK,
      LAYOUT_LABELS.PADDLE_BOARD,
      LAYOUT_LABELS.JET_SKI,
    ]);
    expect(readStoredBoardLayout().order).toEqual([
      LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.KAYAK],
      LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.PADDLE_BOARD],
      LAYOUT_CARD_ID_BY_LABEL[LAYOUT_LABELS.JET_SKI],
    ]);
  });

  it("does not open the category after a drag", async () => {
    const page = await renderBoard();
    const firstCard = page.getCards()[0];

    fireEvent.pointerDown(firstCard, pointer(MOUSE, 0));
    fireEvent.pointerMove(
      firstCard,
      pointer(
        MOUSE,
        0,
        BOARD_CARD_DRAG.MOVE_TOLERANCE_PX + 1
      )
    );
    fireEvent.pointerUp(firstCard, pointer(MOUSE, 0));

    expect(fireEvent.click(firstCard)).toBe(false);
  });

  it("moves a card with the finger after a long press", async () => {
    const page = await renderBoard();
    vi.useFakeTimers();
    const firstCard = page.getCards()[0];

    fireEvent.pointerDown(firstCard, pointer(TOUCH, 0));
    act(() => {
      vi.advanceTimersByTime(BOARD_CARD_DRAG.LONG_PRESS_MS);
    });
    fireEvent.pointerMove(
      firstCard,
      pointer(TOUCH, LAST_CARD_INDEX)
    );
    fireEvent.pointerUp(
      firstCard,
      pointer(TOUCH, LAST_CARD_INDEX)
    );

    expect(getCardLabels(page)[LAST_CARD_INDEX]).toBe(
      LAYOUT_LABELS.JET_SKI
    );
  });

  it("lets the finger scroll when it moves before the long press ends", async () => {
    const page = await renderBoard();
    vi.useFakeTimers();
    const firstCard = page.getCards()[0];

    fireEvent.pointerDown(firstCard, pointer(TOUCH, 0));
    fireEvent.pointerMove(
      firstCard,
      pointer(
        TOUCH,
        0,
        BOARD_CARD_DRAG.MOVE_TOLERANCE_PX + 1
      )
    );
    act(() => {
      vi.advanceTimersByTime(BOARD_CARD_DRAG.LONG_PRESS_MS);
    });
    fireEvent.pointerMove(
      firstCard,
      pointer(TOUCH, LAST_CARD_INDEX)
    );

    expect(getCardLabels(page)[0]).toBe(
      LAYOUT_LABELS.JET_SKI
    );
  });

  it("ignores a small movement of the mouse", async () => {
    const page = await renderBoard();
    const firstCard = page.getCards()[0];

    fireEvent.pointerDown(firstCard, pointer(MOUSE, 0));
    fireEvent.pointerMove(
      firstCard,
      pointer(MOUSE, 0, SMALL_MOVE_PX)
    );
    fireEvent.pointerUp(firstCard, pointer(MOUSE, 0));

    expect(fireEvent.click(firstCard)).toBe(true);
  });
});

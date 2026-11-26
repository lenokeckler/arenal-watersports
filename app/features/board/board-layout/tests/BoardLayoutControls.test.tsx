import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_LAYOUT_COLUMNS,
  DEFAULT_BOARD_LAYOUT,
  KEYBOARD,
} from "@/app/constants";
import { readStoredBoardLayout } from "@/app/utils/board-layout/readStoredBoardLayout";
import { createBoardLayoutControlsPage } from "./BoardLayoutControls.page";
import {
  JET_SKI_CARD,
  KAYAK_CARD,
  LAST_ROW_INDEX,
  PADDLE_CARD,
  REMOVED_CATEGORY_ID,
  SECONDARY_BUTTON,
  SUP_CARD,
} from "./BoardLayoutControls.constants";
import {
  publishBoardCards,
  renderBoardLayoutControls,
  resetBoardLayoutStore,
} from "./renderBoardLayoutControls";

const ALL_CARDS = [JET_SKI_CARD, KAYAK_CARD, PADDLE_CARD];

describe("BoardLayoutControls", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    resetBoardLayoutStore();
  });

  it("shows nothing while the board has no categories", () => {
    renderBoardLayoutControls([]);
    const page = createBoardLayoutControlsPage();

    expect(page.queryControls()).not.toBeInTheDocument();
  });

  it("lists the categories and marks no column count until one is chosen", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();

    expect(page.getOrderedLabels()).toEqual(
      ALL_CARDS.map((card) => card.label)
    );
    expect(
      page.getColumnsButton(BOARD_LAYOUT_COLUMNS.TWO)
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      page.getColumnsButton(BOARD_LAYOUT_COLUMNS.THREE)
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("offers two or three cards per row and saves the choice on the device", async () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();

    await page.chooseColumns(BOARD_LAYOUT_COLUMNS.THREE);

    expect(
      page.getColumnsButton(BOARD_LAYOUT_COLUMNS.THREE)
    ).toHaveAttribute("aria-pressed", "true");
    expect(readStoredBoardLayout().columns).toBe(
      BOARD_LAYOUT_COLUMNS.THREE
    );

    await page.chooseColumns(BOARD_LAYOUT_COLUMNS.TWO);

    expect(readStoredBoardLayout().columns).toBe(
      BOARD_LAYOUT_COLUMNS.TWO
    );
  });

  it("shows the saved columns as the chosen option", () => {
    renderBoardLayoutControls(ALL_CARDS, {
      columns: BOARD_LAYOUT_COLUMNS.TWO,
      order: [],
    });
    const page = createBoardLayoutControlsPage();

    expect(
      page.getColumnsButton(BOARD_LAYOUT_COLUMNS.TWO)
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("moves a category later with the keyboard and saves the order", async () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();

    await page.pressKeyOnHandle(
      JET_SKI_CARD.label,
      KEYBOARD.ARROW_DOWN
    );

    expect(page.getOrderedLabels()).toEqual([
      KAYAK_CARD.label,
      JET_SKI_CARD.label,
      PADDLE_CARD.label,
    ]);
    expect(readStoredBoardLayout().order).toEqual([
      KAYAK_CARD.id,
      JET_SKI_CARD.id,
      PADDLE_CARD.id,
    ]);
  });

  it("moves a category earlier with the keyboard", async () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();

    await page.pressKeyOnHandle(
      PADDLE_CARD.label,
      KEYBOARD.ARROW_UP
    );

    expect(page.getOrderedLabels()).toEqual([
      JET_SKI_CARD.label,
      PADDLE_CARD.label,
      KAYAK_CARD.label,
    ]);
  });

  it("does not save anything when a category is already at the edge", async () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();

    await page.pressKeyOnHandle(
      JET_SKI_CARD.label,
      KEYBOARD.ARROW_UP
    );

    expect(readStoredBoardLayout()).toEqual(
      DEFAULT_BOARD_LAYOUT
    );
  });

  it("reorders by dragging the handle with the pointer", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();
    page.layOutRows();

    page.pressHandle(JET_SKI_CARD.label);
    page.dragHandleToRow(
      JET_SKI_CARD.label,
      LAST_ROW_INDEX
    );
    page.releaseHandle(JET_SKI_CARD.label);

    expect(page.getOrderedLabels()).toEqual([
      KAYAK_CARD.label,
      PADDLE_CARD.label,
      JET_SKI_CARD.label,
    ]);
    expect(readStoredBoardLayout().order).toEqual([
      KAYAK_CARD.id,
      PADDLE_CARD.id,
      JET_SKI_CARD.id,
    ]);
  });

  it("stops following the pointer once it was released", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();
    page.layOutRows();

    page.pressHandle(JET_SKI_CARD.label);
    page.releaseHandle(JET_SKI_CARD.label);
    page.dragHandleToRow(
      JET_SKI_CARD.label,
      LAST_ROW_INDEX
    );

    expect(page.getOrderedLabels()).toEqual(
      ALL_CARDS.map((card) => card.label)
    );
  });

  it("takes the pointer back when the handle loses it while dragging, and lets it go after the release", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();
    const captureSpy = vi.spyOn(
      HTMLElement.prototype,
      "setPointerCapture"
    );

    page.pressHandle(JET_SKI_CARD.label);
    page.loseHandleCapture(JET_SKI_CARD.label);

    expect(captureSpy).toHaveBeenCalledTimes(2);

    page.releaseHandle(JET_SKI_CARD.label);
    page.loseHandleCapture(JET_SKI_CARD.label);

    expect(captureSpy).toHaveBeenCalledTimes(2);
  });

  it("ends the drag when the pointer cannot be captured", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();
    page.layOutRows();
    vi.spyOn(
      HTMLElement.prototype,
      "setPointerCapture"
    ).mockImplementation(() => {
      throw new Error("inactive pointer");
    });

    page.pressHandle(JET_SKI_CARD.label);
    page.dragHandleToRow(
      JET_SKI_CARD.label,
      LAST_ROW_INDEX
    );

    expect(page.getOrderedLabels()).toEqual(
      ALL_CARDS.map((card) => card.label)
    );
  });

  it("ignores a press that is not the primary button", () => {
    renderBoardLayoutControls(ALL_CARDS);
    const page = createBoardLayoutControlsPage();
    page.layOutRows();

    page.pressHandle(JET_SKI_CARD.label, SECONDARY_BUTTON);
    page.dragHandleToRow(
      JET_SKI_CARD.label,
      LAST_ROW_INDEX
    );

    expect(page.getOrderedLabels()).toEqual(
      ALL_CARDS.map((card) => card.label)
    );
  });

  it("ignores a saved category that no longer exists and keeps the unmentioned ones at the end", () => {
    renderBoardLayoutControls(
      [JET_SKI_CARD, KAYAK_CARD, SUP_CARD],
      {
        columns: null,
        order: [REMOVED_CATEGORY_ID, SUP_CARD.id],
      }
    );
    const page = createBoardLayoutControlsPage();

    expect(page.getOrderedLabels()).toEqual([
      SUP_CARD.label,
      JET_SKI_CARD.label,
      KAYAK_CARD.label,
    ]);
  });

  it("places a category administration added at the end without saving anything", () => {
    renderBoardLayoutControls([JET_SKI_CARD, KAYAK_CARD], {
      columns: null,
      order: [KAYAK_CARD.id, JET_SKI_CARD.id],
    });
    const page = createBoardLayoutControlsPage();

    publishBoardCards([JET_SKI_CARD, KAYAK_CARD, SUP_CARD]);

    expect(page.getOrderedLabels()).toEqual([
      KAYAK_CARD.label,
      JET_SKI_CARD.label,
      SUP_CARD.label,
    ]);
    expect(readStoredBoardLayout()).toEqual(
      DEFAULT_BOARD_LAYOUT
    );
  });

  it("drops a category administration removed without saving anything", () => {
    renderBoardLayoutControls(ALL_CARDS, {
      columns: null,
      order: [
        PADDLE_CARD.id,
        KAYAK_CARD.id,
        JET_SKI_CARD.id,
      ],
    });
    const page = createBoardLayoutControlsPage();

    publishBoardCards([JET_SKI_CARD, PADDLE_CARD]);

    expect(page.getOrderedLabels()).toEqual([
      PADDLE_CARD.label,
      JET_SKI_CARD.label,
    ]);
    expect(readStoredBoardLayout()).toEqual(
      DEFAULT_BOARD_LAYOUT
    );
  });
});

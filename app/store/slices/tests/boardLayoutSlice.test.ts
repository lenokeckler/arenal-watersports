import { describe, expect, it } from "vitest";
import {
  BOARD_LAYOUT_COLUMNS,
  DEFAULT_BOARD_LAYOUT,
} from "@/app/constants";
import boardLayoutReducer, {
  boardLayoutActions,
} from "../boardLayoutSlice";

const JET_SKI_CARD = { id: "jet-ski", label: "Jet ski" };
const KAYAK_CARD = { id: "kayak", label: "Kayak" };

describe("boardLayoutSlice", () => {
  it("starts with the default layout and no cards", () => {
    const state = boardLayoutReducer(undefined, {
      type: "unknown",
    });

    expect(state).toEqual({
      ...DEFAULT_BOARD_LAYOUT,
      cards: [],
    });
  });

  it("keeps the cards the board publishes", () => {
    const state = boardLayoutReducer(
      undefined,
      boardLayoutActions.setCards([
        JET_SKI_CARD,
        KAYAK_CARD,
      ])
    );

    expect(state.cards).toEqual([JET_SKI_CARD, KAYAK_CARD]);
  });

  it("sets the columns and the order on their own", () => {
    const withColumns = boardLayoutReducer(
      undefined,
      boardLayoutActions.setColumns(
        BOARD_LAYOUT_COLUMNS.THREE
      )
    );
    const withOrder = boardLayoutReducer(
      withColumns,
      boardLayoutActions.setOrder([KAYAK_CARD.id])
    );

    expect(withOrder.columns).toBe(
      BOARD_LAYOUT_COLUMNS.THREE
    );
    expect(withOrder.order).toEqual([KAYAK_CARD.id]);
  });

  it("restores a whole stored preference without touching the cards", () => {
    const withCards = boardLayoutReducer(
      undefined,
      boardLayoutActions.setCards([JET_SKI_CARD])
    );
    const restored = boardLayoutReducer(
      withCards,
      boardLayoutActions.setPreference({
        columns: BOARD_LAYOUT_COLUMNS.TWO,
        order: [KAYAK_CARD.id, JET_SKI_CARD.id],
      })
    );

    expect(restored.columns).toBe(BOARD_LAYOUT_COLUMNS.TWO);
    expect(restored.order).toEqual([
      KAYAK_CARD.id,
      JET_SKI_CARD.id,
    ]);
    expect(restored.cards).toEqual([JET_SKI_CARD]);
  });
});

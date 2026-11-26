import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_LAYOUT_STORAGE_KEY,
  DEFAULT_BOARD_LAYOUT,
} from "@/app/constants";
import { persistBoardLayout } from "../persistBoardLayout";
import { readStoredBoardLayout } from "../readStoredBoardLayout";
import {
  BOARD_IDS,
  STORED_LAYOUT_JSON,
  THREE_COLUMNS,
  TWO_COLUMNS,
} from "./boardLayout.constants";

describe("stored board layout", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("reads the default layout when nothing was saved", () => {
    expect(readStoredBoardLayout()).toEqual(
      DEFAULT_BOARD_LAYOUT
    );
  });

  it("reads back what was persisted", () => {
    persistBoardLayout({
      columns: TWO_COLUMNS,
      order: [BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI],
    });

    expect(readStoredBoardLayout()).toEqual({
      columns: TWO_COLUMNS,
      order: [BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI],
    });
  });

  it("reads a valid stored value", () => {
    window.localStorage.setItem(
      BOARD_LAYOUT_STORAGE_KEY,
      STORED_LAYOUT_JSON.VALID
    );

    expect(readStoredBoardLayout()).toEqual({
      columns: THREE_COLUMNS,
      order: [BOARD_IDS.KAYAK, BOARD_IDS.JET_SKI],
    });
  });

  it("falls back to the default for unreadable or foreign values", () => {
    [
      STORED_LAYOUT_JSON.CORRUPT,
      STORED_LAYOUT_JSON.NOT_AN_OBJECT,
    ].forEach((storedValue) => {
      window.localStorage.setItem(
        BOARD_LAYOUT_STORAGE_KEY,
        storedValue
      );

      expect(readStoredBoardLayout()).toEqual(
        DEFAULT_BOARD_LAYOUT
      );
    });
  });

  it("drops an unsupported column count but keeps the order", () => {
    window.localStorage.setItem(
      BOARD_LAYOUT_STORAGE_KEY,
      STORED_LAYOUT_JSON.FOREIGN_COLUMNS
    );

    expect(readStoredBoardLayout()).toEqual({
      columns: null,
      order: [BOARD_IDS.KAYAK],
    });
  });

  it("keeps only the string ids of a stored order", () => {
    window.localStorage.setItem(
      BOARD_LAYOUT_STORAGE_KEY,
      STORED_LAYOUT_JSON.MIXED_ORDER
    );

    expect(readStoredBoardLayout().order).toEqual([
      BOARD_IDS.KAYAK,
      BOARD_IDS.JET_SKI,
    ]);
  });

  it("falls back to the default when the storage cannot be read", () => {
    vi.spyOn(
      Storage.prototype,
      "getItem"
    ).mockImplementation(() => {
      throw new Error("blocked");
    });

    expect(readStoredBoardLayout()).toEqual(
      DEFAULT_BOARD_LAYOUT
    );
  });

  it("does not throw when the storage cannot be written", () => {
    vi.spyOn(
      Storage.prototype,
      "setItem"
    ).mockImplementation(() => {
      throw new Error("full");
    });

    expect(() =>
      persistBoardLayout(DEFAULT_BOARD_LAYOUT)
    ).not.toThrow();
  });
});

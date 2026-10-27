import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

describe("useCategoryListViewModel", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
  });

  it("returns the ready view state when categories exist and the fetch succeeded", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    expect(result.current.viewState).toBe(
      CATEGORY_LIST_VIEW_STATE.READY
    );
  });

  it("returns the empty view state when there are no categories and the fetch succeeded", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [],
        fetchFailed: false,
      })
    );

    expect(result.current.viewState).toBe(
      CATEGORY_LIST_VIEW_STATE.EMPTY
    );
  });

  it("returns the error view state when the fetch failed and there are no categories", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [],
        fetchFailed: true,
      })
    );

    expect(result.current.viewState).toBe(
      CATEGORY_LIST_VIEW_STATE.ERROR
    );
  });

  it("returns the error view state instead of the empty view state when both are true at once", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: true,
      })
    );

    expect(result.current.viewState).toBe(
      CATEGORY_LIST_VIEW_STATE.ERROR
    );
  });

  it("hardcodes every card's action state to NONE regardless of the underlying category", () => {
    const categoryWithRecords = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "with-records",
      hasRecords: true,
    };
    const categoryWithoutRecords = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "without-records",
      hasRecords: false,
    };
    const inactiveCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "inactive",
      status: CATEGORY_STATUS.INACTIVE,
    };

    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [
          categoryWithRecords,
          categoryWithoutRecords,
          inactiveCategory,
        ],
        fetchFailed: false,
      })
    );

    expect(
      result.current.cards.map((card) => card.actionState)
    ).toEqual([
      CATEGORY_CARD_ACTION_STATE.NONE,
      CATEGORY_CARD_ACTION_STATE.NONE,
      CATEGORY_CARD_ACTION_STATE.NONE,
    ]);
  });

  it("keeps every card's category payload identical to the one it received", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    expect(result.current.cards[0].category).toBe(
      DEFAULT_CATEGORY_LIST_ITEM
    );
  });

  it("derives the inactive flag and the tracking mode label of every card from its category", () => {
    const inactiveCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      status: CATEGORY_STATUS.INACTIVE,
    };

    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [
          DEFAULT_CATEGORY_LIST_ITEM,
          inactiveCategory,
        ],
        fetchFailed: false,
      })
    );

    expect(
      result.current.cards.map((card) => card.isInactive)
    ).toEqual([false, true]);
    expect(result.current.cards[0].trackingModeLabel).toBe(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_UNIT
    );
  });

  it("marks every card's action as not loading before any mutation is wired", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    expect(result.current.cards[0].isActionLoading).toBe(
      false
    );
  });

  it("does not throw when a card's action handlers are invoked before mutations are wired", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );
    const [card] = result.current.cards;

    expect(() => {
      card.onDeleteClick();
      card.onMarkInactiveClick();
      card.onCancelClick();
      card.onConfirmDeleteClick();
    }).not.toThrow();
  });

  it("refreshes the current route when onRetry is called", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [],
        fetchFailed: true,
      })
    );

    result.current.onRetry();

    expect(mockRefresh).toHaveBeenCalledOnce();
  });
});

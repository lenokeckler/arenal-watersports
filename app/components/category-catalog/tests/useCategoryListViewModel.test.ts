import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe("useCategoryListViewModel", () => {
  beforeEach(() => {
    mockPush.mockClear();
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

  it("builds one card per category carrying its own resolved action state", () => {
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
      CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE,
      CATEGORY_CARD_ACTION_STATE.DELETE,
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

  it("navigates to the create-category route when onCreateCategory is called", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [],
        fetchFailed: false,
      })
    );

    result.current.onCreateCategory();

    expect(mockPush).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES_NEW
    );
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

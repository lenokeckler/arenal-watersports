import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockMarkCategoryInactiveAction = vi.fn();
const mockDeleteCategoryAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
  unstable_rethrow: vi.fn(),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

vi.mock("../services/markCategoryInactiveAction", () => ({
  markCategoryInactiveAction: (categoryId: string) =>
    mockMarkCategoryInactiveAction(categoryId),
}));

vi.mock("../services/deleteCategoryAction", () => ({
  deleteCategoryAction: (categoryId: string) =>
    mockDeleteCategoryAction(categoryId),
}));

describe("useCategoryListViewModel cards", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
  });

  it("resolves each card's action state from its own category", () => {
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
      CATEGORY_CARD_ACTION_STATE.REACTIVATE,
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

  it("derives the inactive flag and the subtitle of every card from its category", () => {
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
    expect(result.current.cards[0].subtitle).toBe(
      resolveCategorySubtitle(DEFAULT_CATEGORY_LIST_ITEM)
    );
  });

  it("starts with every options panel closed", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    expect(result.current.cards[0].isPanelOpen).toBe(false);
  });

  it("opens only the panel of the card whose Editar was pressed and closes it on a second press", () => {
    const otherCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "other-category",
    };
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [
          DEFAULT_CATEGORY_LIST_ITEM,
          otherCategory,
        ],
        fetchFailed: false,
      })
    );

    act(() => result.current.cards[0].onTogglePanelClick());

    expect(
      result.current.cards.map((card) => card.isPanelOpen)
    ).toEqual([true, false]);

    act(() => result.current.cards[1].onTogglePanelClick());

    expect(
      result.current.cards.map((card) => card.isPanelOpen)
    ).toEqual([false, true]);

    act(() => result.current.cards[1].onTogglePanelClick());

    expect(
      result.current.cards.map((card) => card.isPanelOpen)
    ).toEqual([false, false]);
  });

  it("gives every card its own panel id", () => {
    const otherCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "other-category",
    };
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [
          DEFAULT_CATEGORY_LIST_ITEM,
          otherCategory,
        ],
        fetchFailed: false,
      })
    );

    expect(result.current.cards[0].panelId).not.toBe(
      result.current.cards[1].panelId
    );
  });
});

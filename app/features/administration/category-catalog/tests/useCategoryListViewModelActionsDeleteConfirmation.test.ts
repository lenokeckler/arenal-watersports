import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
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

describe("useCategoryListViewModel card actions: delete confirmation", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
  });
  it("swaps the clicked card into the confirm-delete state without calling the delete action", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    act(() => {
      result.current.cards[0].onDeleteClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );
    expect(mockDeleteCategoryAction).not.toHaveBeenCalled();
  });

  it("returns the clicked card to its default state when onCancelClick is called", () => {
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [DEFAULT_CATEGORY_LIST_ITEM],
        fetchFailed: false,
      })
    );

    act(() => {
      result.current.cards[0].onDeleteClick();
    });
    act(() => {
      result.current.cards[0].onCancelClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.DELETE
    );
  });

  it("only puts the clicked card into the confirm-delete state, leaving every other card untouched", () => {
    const otherCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "other-category-id",
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

    act(() => {
      result.current.cards[0].onDeleteClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );
    expect(result.current.cards[1].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.DELETE
    );
  });
});

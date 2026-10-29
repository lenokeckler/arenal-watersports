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

describe("useCategoryListViewModel card actions: focus changes", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
  });
  it("moves the confirm-delete state to the newly clicked card and reverts the previous one, without cancelling first", () => {
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

    act(() => {
      result.current.cards[1].onDeleteClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.DELETE
    );
    expect(result.current.cards[1].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );
  });

  it("leaves the confirming card untouched when a different card's cancel handler is called", () => {
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
    act(() => {
      result.current.cards[1].onCancelClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );
  });
});

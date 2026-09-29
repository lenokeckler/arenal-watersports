import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockRefresh = vi.fn();
const mockShowToast = vi.fn();
const mockMarkCategoryInactiveAction = vi.fn();
const mockDeleteCategoryAction = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
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

describe("useCategoryListViewModel", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
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

  describe("marking a category inactive", () => {
    it("calls the mark-inactive action with the clicked category's id", async () => {
      mockMarkCategoryInactiveAction.mockResolvedValue({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
      });
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onMarkInactiveClick();
      });

      await waitFor(() => {
        expect(
          mockMarkCategoryInactiveAction
        ).toHaveBeenCalledWith(
          DEFAULT_CATEGORY_LIST_ITEM.id
        );
      });
    });

    it("marks only the clicked card as loading while its action is in flight", async () => {
      let resolveAction: () => void = () => undefined;
      mockMarkCategoryInactiveAction.mockReturnValue(
        new Promise<CategoryMutationResult>((resolve) => {
          resolveAction = () =>
            resolve({
              status: CATEGORY_MUTATION_STATUS.SUCCESS,
            });
        })
      );
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
        result.current.cards[0].onMarkInactiveClick();
      });

      expect(result.current.cards[0].isActionLoading).toBe(
        true
      );
      expect(result.current.cards[1].isActionLoading).toBe(
        false
      );

      act(() => {
        resolveAction();
      });

      await waitFor(() => {
        expect(
          result.current.cards[0].isActionLoading
        ).toBe(false);
      });
    });

    it("shows a success toast and refreshes the list when the action succeeds", async () => {
      mockMarkCategoryInactiveAction.mockResolvedValue({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
      });
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onMarkInactiveClick();
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          STATUS.SUCCESS,
          CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST
        );
      });
      expect(mockRefresh).toHaveBeenCalledOnce();
    });

    it("shows a generic error toast, does not refresh, and clears the loading state when the action throws", async () => {
      mockMarkCategoryInactiveAction.mockRejectedValue(
        new Error("boom")
      );
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onMarkInactiveClick();
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          STATUS.ERROR,
          CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
        );
      });
      expect(mockRefresh).not.toHaveBeenCalled();
      expect(result.current.cards[0].isActionLoading).toBe(
        false
      );
    });
  });

  describe("deleting a category", () => {
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
      expect(
        mockDeleteCategoryAction
      ).not.toHaveBeenCalled();
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

    it("calls the delete action with the clicked category's id when the deletion is confirmed", async () => {
      mockDeleteCategoryAction.mockResolvedValue({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
      });
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onConfirmDeleteClick();
      });

      await waitFor(() => {
        expect(
          mockDeleteCategoryAction
        ).toHaveBeenCalledWith(
          DEFAULT_CATEGORY_LIST_ITEM.id
        );
      });
    });

    it("shows a success toast, refreshes, and exits the confirm state when the deletion succeeds", async () => {
      mockDeleteCategoryAction.mockResolvedValue({
        status: CATEGORY_MUTATION_STATUS.SUCCESS,
      });
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onConfirmDeleteClick();
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          STATUS.SUCCESS,
          CATEGORY_CATALOG_COPY.DELETE_SUCCESS_TOAST
        );
      });
      expect(mockRefresh).toHaveBeenCalledOnce();
      expect(result.current.cards[0].actionState).toBe(
        CATEGORY_CARD_ACTION_STATE.DELETE
      );
    });

    it("shows the action's own error message, does not refresh, and exits the confirm state when the delete is rejected with records", async () => {
      mockDeleteCategoryAction.mockResolvedValue({
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message:
          CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR,
      });
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onConfirmDeleteClick();
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          STATUS.ERROR,
          CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR
        );
      });
      expect(mockRefresh).not.toHaveBeenCalled();
      expect(result.current.cards[0].actionState).toBe(
        CATEGORY_CARD_ACTION_STATE.DELETE
      );
    });

    it("shows a generic error toast and exits the confirm state when the delete action throws", async () => {
      mockDeleteCategoryAction.mockRejectedValue(
        new Error("boom")
      );
      const { result } = renderHook(() =>
        useCategoryListViewModel({
          categories: [DEFAULT_CATEGORY_LIST_ITEM],
          fetchFailed: false,
        })
      );

      act(() => {
        result.current.cards[0].onConfirmDeleteClick();
      });

      await waitFor(() => {
        expect(mockShowToast).toHaveBeenCalledWith(
          STATUS.ERROR,
          CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
        );
      });
      expect(result.current.cards[0].actionState).toBe(
        CATEGORY_CARD_ACTION_STATE.DELETE
      );
    });

    it("marks only the clicked card as loading while the deletion is in flight", async () => {
      let resolveAction: () => void = () => undefined;
      mockDeleteCategoryAction.mockReturnValue(
        new Promise<CategoryMutationResult>((resolve) => {
          resolveAction = () =>
            resolve({
              status: CATEGORY_MUTATION_STATUS.SUCCESS,
            });
        })
      );
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
        result.current.cards[0].onConfirmDeleteClick();
      });

      expect(result.current.cards[0].isActionLoading).toBe(
        true
      );
      expect(result.current.cards[1].isActionLoading).toBe(
        false
      );

      act(() => {
        resolveAction();
      });

      await waitFor(() => {
        expect(
          result.current.cards[0].isActionLoading
        ).toBe(false);
      });
    });
  });
});

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
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
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

describe("useCategoryListViewModel card actions: mark inactive outcome", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
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

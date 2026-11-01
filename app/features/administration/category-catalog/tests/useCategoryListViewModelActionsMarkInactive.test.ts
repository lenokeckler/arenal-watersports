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
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
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

describe("useCategoryListViewModel card actions: mark inactive", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
  });
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
      ).toHaveBeenCalledWith(DEFAULT_CATEGORY_LIST_ITEM.id);
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
      expect(result.current.cards[0].isActionLoading).toBe(
        false
      );
    });
  });
});

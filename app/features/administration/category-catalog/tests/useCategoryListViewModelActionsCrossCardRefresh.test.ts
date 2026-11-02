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
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
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

describe("useCategoryListViewModel card actions: pending and refreshes", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
  });
  it("leaves the confirming card untouched while a different card is marked inactive", async () => {
    mockMarkCategoryInactiveAction.mockResolvedValue({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
    const categoryWithRecords = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "with-records",
      hasRecords: true,
    };
    const { result } = renderHook(() =>
      useCategoryListViewModel({
        categories: [
          DEFAULT_CATEGORY_LIST_ITEM,
          categoryWithRecords,
        ],
        fetchFailed: false,
      })
    );

    act(() => {
      result.current.cards[0].onDeleteClick();
    });
    act(() => {
      result.current.cards[1].onMarkInactiveClick();
    });

    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalledOnce();
    });
    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );
  });

  it("drops the confirming card cleanly instead of crashing when a refresh removes it from the list", () => {
    const otherCategory = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      id: "other-category-id",
    };
    const { result, rerender } = renderHook(
      (props: { categories: CategoryListItem[] }) =>
        useCategoryListViewModel({
          categories: props.categories,
          fetchFailed: false,
        }),
      {
        initialProps: {
          categories: [
            DEFAULT_CATEGORY_LIST_ITEM,
            otherCategory,
          ],
        },
      }
    );

    act(() => {
      result.current.cards[0].onDeleteClick();
    });
    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    );

    rerender({ categories: [otherCategory] });

    expect(result.current.cards).toHaveLength(1);
    expect(result.current.cards[0].category.id).toBe(
      otherCategory.id
    );
    expect(result.current.cards[0].actionState).toBe(
      CATEGORY_CARD_ACTION_STATE.DELETE
    );
  });
});

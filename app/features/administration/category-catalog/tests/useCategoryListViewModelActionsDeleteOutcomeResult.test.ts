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

describe("useCategoryListViewModel card actions: delete rejections and failures", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockShowToast.mockClear();
    mockMarkCategoryInactiveAction.mockReset();
    mockDeleteCategoryAction.mockReset();
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
});

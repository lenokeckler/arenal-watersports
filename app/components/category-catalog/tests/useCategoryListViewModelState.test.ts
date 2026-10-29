import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

describe("useCategoryListViewModel view state", () => {
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

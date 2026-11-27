import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { useCategoryListViewModel } from "../hooks/useCategoryListViewModel";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
  unstable_rethrow: vi.fn(),
}));

describe("useCategoryListViewModel cards", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
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
});

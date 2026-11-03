import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { useStockCountViewModel } from "../hooks/useStockCountViewModel";
import {
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_LEVELS,
} from "./Stock.constants";

const { pushMock, refreshMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

vi.mock("@/app/components/toast/utils/useToast", () => ({
  useToast: () => ({ showToast: vi.fn() }),
}));

describe("useStockCountViewModel navigation", () => {
  beforeEach(() => {
    pushMock.mockClear();
    refreshMock.mockClear();
  });

  it("goes back to the category list", () => {
    const { result } = renderHook(() =>
      useStockCountViewModel({
        category: DEFAULT_STOCK_CATEGORY,
        fetchFailed: false,
        levels: DEFAULT_STOCK_LEVELS,
        movements: [],
      })
    );

    act(() => {
      result.current.onBack();
    });

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.CATEGORIES
    );
  });
});

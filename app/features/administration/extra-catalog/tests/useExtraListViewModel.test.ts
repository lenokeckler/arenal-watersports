import { renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { EXTRA_LIST_VIEW_STATE } from "../constants/ExtraListViewState.constants";
import { useExtraListViewModel } from "../hooks/useExtraListViewModel";
import { buildExtraCardViewModel } from "../utils/buildExtraCardViewModel";
import { DEFAULT_EXTRA } from "./Extra.constants";

const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

describe("useExtraListViewModel", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("builds one card per extra and reports the ready state", () => {
    const { result } = renderHook(() =>
      useExtraListViewModel({
        extras: [DEFAULT_EXTRA],
        fetchFailed: false,
      })
    );

    expect(result.current.cards).toEqual([
      buildExtraCardViewModel(DEFAULT_EXTRA),
    ]);
    expect(result.current.viewState).toBe(
      EXTRA_LIST_VIEW_STATE.READY
    );
  });

  it("refreshes the current route on retry", () => {
    const { result } = renderHook(() =>
      useExtraListViewModel({
        extras: [],
        fetchFailed: true,
      })
    );

    result.current.onRetry();

    expect(refreshMock).toHaveBeenCalledOnce();
  });
});

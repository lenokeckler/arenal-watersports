import { act, renderHook } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useReservationHistoryRetryViewModel } from "../hooks/useReservationHistoryRetryViewModel";

const mockRefresh = vi.fn();
const mockReset = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

describe("useReservationHistoryRetryViewModel", () => {
  beforeEach(() => {
    mockRefresh.mockClear();
    mockReset.mockClear();
  });

  it("does nothing until the retry is requested", () => {
    renderHook(() =>
      useReservationHistoryRetryViewModel({
        reset: mockReset,
      })
    );

    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockReset).not.toHaveBeenCalled();
  });

  it("refreshes the route and resets the boundary on retry", () => {
    const { result } = renderHook(() =>
      useReservationHistoryRetryViewModel({
        reset: mockReset,
      })
    );

    act(() => result.current.handleRetry());

    expect(mockRefresh).toHaveBeenCalledTimes(1);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});

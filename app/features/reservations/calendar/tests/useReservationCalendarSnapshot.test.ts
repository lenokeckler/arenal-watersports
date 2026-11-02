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
import { readReservationCalendarPeriod } from "../actions/readReservationCalendarPeriod";
import { useReservationCalendarSnapshot } from "../hooks/useReservationCalendarSnapshot";
import { RESERVATION_CALENDAR_SNAPSHOT_HOOK_FIXTURE as fixture } from "./ReservationCalendarSnapshotHook.constants";

vi.mock("../actions/readReservationCalendarPeriod", () => ({
  readReservationCalendarPeriod: vi.fn(),
}));

vi.mock("../hooks/useReservationsCalendarRealtime", () => ({
  useReservationsCalendarRealtime: vi.fn(),
}));

describe("useReservationCalendarSnapshot", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(
      readReservationCalendarPeriod
    ).mockResolvedValue(fixture.WEEK_SNAPSHOT);
  });

  it("keeps a complete initial snapshot without requesting it again", () => {
    const { result } = renderHook(() =>
      useReservationCalendarSnapshot(fixture.DAY_SNAPSHOT)
    );

    act(() =>
      result.current.onPeriodChange(fixture.DAY_PERIOD)
    );

    expect(
      readReservationCalendarPeriod
    ).not.toHaveBeenCalled();
    expect(result.current.snapshot).toEqual(
      fixture.DAY_SNAPSHOT
    );
  });

  it("loads the selected period and replaces the snapshot", async () => {
    const { result } = renderHook(() =>
      useReservationCalendarSnapshot(fixture.DAY_SNAPSHOT)
    );

    act(() =>
      result.current.onPeriodChange(fixture.WEEK_PERIOD)
    );

    await waitFor(() => {
      expect(result.current.snapshot).toEqual(
        fixture.WEEK_SNAPSHOT
      );
    });
    expect(
      readReservationCalendarPeriod
    ).toHaveBeenCalledWith({
      anchor: fixture.WEEK_PERIOD.start,
      view: fixture.WEEK_PERIOD.view,
    });
    expect(result.current.hasRefreshError).toBe(false);
    expect(result.current.isRefreshing).toBe(false);
  });

  it("ignores a late response after a newer period is selected", async () => {
    let resolveWeek = (
      _snapshot: typeof fixture.WEEK_SNAPSHOT
    ): void => undefined;
    const pendingWeek = new Promise<
      typeof fixture.WEEK_SNAPSHOT
    >((resolve) => {
      resolveWeek = resolve;
    });
    vi.mocked(
      readReservationCalendarPeriod
    ).mockReturnValueOnce(pendingWeek);
    const { result } = renderHook(() =>
      useReservationCalendarSnapshot(fixture.DAY_SNAPSHOT)
    );

    act(() =>
      result.current.onPeriodChange(fixture.WEEK_PERIOD)
    );
    act(() =>
      result.current.onPeriodChange(fixture.DAY_PERIOD)
    );

    await act(async () => {
      resolveWeek(fixture.WEEK_SNAPSHOT);
      await pendingWeek;
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(result.current.snapshot).toEqual(
      fixture.DAY_SNAPSHOT
    );
  });

  it("retains stale data after failure and retries the failed period", async () => {
    vi.mocked(readReservationCalendarPeriod)
      .mockRejectedValueOnce(new Error())
      .mockResolvedValueOnce(fixture.WEEK_SNAPSHOT);
    const { result } = renderHook(() =>
      useReservationCalendarSnapshot(fixture.DAY_SNAPSHOT)
    );

    act(() =>
      result.current.onPeriodChange(fixture.WEEK_PERIOD)
    );
    await waitFor(() =>
      expect(result.current.hasRefreshError).toBe(true)
    );

    expect(result.current.snapshot).toEqual(
      fixture.DAY_SNAPSHOT
    );

    await act(async () => {
      await result.current.onRetry();
    });
    await waitFor(() =>
      expect(result.current.snapshot).toEqual(
        fixture.WEEK_SNAPSHOT
      )
    );
    expect(result.current.hasRefreshError).toBe(false);
    expect(
      readReservationCalendarPeriod
    ).toHaveBeenCalledTimes(fixture.RETRY_ATTEMPTS);
  });
});

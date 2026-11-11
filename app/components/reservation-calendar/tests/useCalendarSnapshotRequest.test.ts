import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CALENDAR_CLIENT_TEST } from "./CalendarClient.constants";
import { RESERVATION_CALENDAR_SNAPSHOT_HOOK_FIXTURE as fixture } from "./ReservationCalendarSnapshotHook.constants";
import { useCalendarSnapshotRequest } from "../hooks/useCalendarSnapshotRequest";

describe("calendar snapshot requests", () => {
  it("keeps the loading state active until the requested snapshot resolves", async () => {
    let resolveSnapshot = (
      _snapshot: typeof fixture.WEEK_SNAPSHOT
    ): void => undefined;
    const pendingSnapshot = new Promise<
      typeof fixture.WEEK_SNAPSHOT
    >((resolve) => {
      resolveSnapshot = resolve;
    });
    const read = vi.fn().mockReturnValue(pendingSnapshot);
    const { result } = renderHook(() =>
      useCalendarSnapshotRequest(fixture.DAY_SNAPSHOT, read)
    );
    expect(result.current.isRefreshing).toBe(false);
    act(() => {
      void result.current.refresh({
        anchor: fixture.WEEK_PERIOD.start,
        view: fixture.WEEK_PERIOD.view,
      });
    });
    expect(result.current.isRefreshing).toBe(true);
    expect(result.current.snapshot).toEqual(
      fixture.DAY_SNAPSHOT
    );
    await act(async () => {
      resolveSnapshot(fixture.WEEK_SNAPSHOT);
      await pendingSnapshot;
    });
    expect(result.current.isRefreshing).toBe(false);
    expect(result.current.refreshError).toBeNull();
    expect(result.current.snapshot).toEqual(
      fixture.WEEK_SNAPSHOT
    );
  });

  it("preserves Next redirect control flow without turning it into a load error", async () => {
    const redirect = Object.assign(new Error(), {
      digest: CALENDAR_CLIENT_TEST.REDIRECT_DIGEST,
    });
    const read = vi.fn().mockRejectedValue(redirect);
    const { result } = renderHook(() =>
      useCalendarSnapshotRequest(null, read)
    );
    await act(async () => {
      await expect(
        result.current.refresh({
          anchor: fixture.DAY_PERIOD.start,
          view: fixture.DAY_PERIOD.view,
        })
      ).rejects.toBe(redirect);
    });
    expect(result.current.refreshError).toBeNull();
    expect(result.current.isRefreshing).toBe(false);
  });
});

import {
  act,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import OutOnWaterView from "../OutOnWaterView";
import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import { OUT_ON_WATER_TIME } from "../constants/OutOnWater.constants";
import type { DispatchedGroupOut } from "../models/DispatchedGroupOut.interface";
import {
  OUT_ON_WATER_GROUP_FIXTURE,
  OUT_ON_WATER_NOW,
  OUT_ON_WATER_TEXT,
} from "./OutOnWater.constants";

const { refreshMock } = vi.hoisted(() => ({
  refreshMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

const renderView = (
  groups: DispatchedGroupOut[],
  errorMessage: string | null = null
) =>
  render(
    <OutOnWaterView
      errorMessage={errorMessage}
      groups={groups}
      nowIso={OUT_ON_WATER_NOW.toISOString()}
    />
  );

describe("OutOnWaterView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(OUT_ON_WATER_NOW);
    refreshMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows each group with its hours and the time left", () => {
    renderView([OUT_ON_WATER_GROUP_FIXTURE]);

    expect(
      screen.getByText(OUT_ON_WATER_TEXT.CUSTOMER)
    ).toBeInTheDocument();
    expect(
      screen.getByText(OUT_ON_WATER_TEXT.EQUIPMENT)
    ).toBeInTheDocument();
    expect(
      screen.getByText(OUT_ON_WATER_TEXT.HOURS)
    ).toBeInTheDocument();
    expect(
      screen.getByText(OUT_ON_WATER_TEXT.REMAINING_40)
    ).toBeInTheDocument();
  });

  it("counts down and refreshes the list while the page stays open", () => {
    renderView([OUT_ON_WATER_GROUP_FIXTURE]);

    act(() => {
      vi.advanceTimersByTime(
        OUT_ON_WATER_TIME.REFRESH_MS * 2
      );
    });

    expect(
      screen.getByText(OUT_ON_WATER_TEXT.REMAINING_39)
    ).toBeInTheDocument();
    expect(refreshMock).toHaveBeenCalledTimes(2);
  });

  it("marks a group past its hour as waiting to return with the minutes late and keeps it listed", () => {
    renderView([OUT_ON_WATER_GROUP_FIXTURE]);

    act(() => {
      vi.advanceTimersByTime(
        OUT_ON_WATER_TEXT.LATE_AFTER_MS
      );
    });

    expect(
      screen.getByText(OUT_ON_WATER_TEXT.OVERDUE)
    ).toBeInTheDocument();
    expect(
      screen.getByText(OUT_ON_WATER_TEXT.LATE_5)
    ).toBeInTheDocument();
    expect(
      screen.getByText(OUT_ON_WATER_TEXT.CUSTOMER)
    ).toBeInTheDocument();
  });

  it("does not mark a group that is still on time", () => {
    renderView([OUT_ON_WATER_GROUP_FIXTURE]);

    expect(
      screen.queryByText(OUT_ON_WATER_TEXT.OVERDUE)
    ).not.toBeInTheDocument();
  });

  it("says so when nothing is out", () => {
    renderView([]);

    expect(
      screen.getByText(OUT_ON_WATER_COPY.EMPTY)
    ).toBeInTheDocument();
  });

  it("shows the error instead of the list", () => {
    renderView([], OUT_ON_WATER_COPY.ERROR);

    expect(screen.getByRole("alert")).toHaveTextContent(
      OUT_ON_WATER_COPY.ERROR
    );
  });
});

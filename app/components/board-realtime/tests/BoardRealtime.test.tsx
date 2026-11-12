import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, within } from "@testing-library/react";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import { BOARD_REALTIME } from "@/app/constants";
import BoardRealtime from "../BoardRealtime";
import { BOARD_REALTIME_COPY } from "../constants/BoardRealtimeCopy.constants";
import { createBoardRealtimePage } from "./BoardRealtime.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock(
  "@/app/components/realtime/hooks/useRealtimeRefresh",
  () => ({ useRealtimeRefresh: vi.fn() })
);

const renderBoardRealtime = () =>
  render(
    <BoardRealtime
      channelName={BOARD_REALTIME.CHANNEL.EQUIPMENT_BOARD}
    />
  );

describe("BoardRealtime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows nothing while live updates are connected", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(false);
    renderBoardRealtime();

    expect(
      createBoardRealtimePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("warns that the board may be stale when live updates are down", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(true);
    renderBoardRealtime();
    const notice = createBoardRealtimePage().getNotice();

    expect(
      within(notice).getByText(
        BOARD_REALTIME_COPY.LIVE_UPDATES_LOST_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(notice).getByText(
        BOARD_REALTIME_COPY.LIVE_UPDATES_LOST_BODY
      )
    ).toBeInTheDocument();
  });
});

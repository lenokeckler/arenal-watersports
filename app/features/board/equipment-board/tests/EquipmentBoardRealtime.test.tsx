import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, within } from "@testing-library/react";
import { useRealtimeRefresh } from "@/app/components/realtime/hooks/useRealtimeRefresh";
import EquipmentBoardRealtime from "../EquipmentBoardRealtime";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { createEquipmentBoardRealtimePage } from "./EquipmentBoardRealtime.page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock(
  "@/app/components/realtime/hooks/useRealtimeRefresh",
  () => ({ useRealtimeRefresh: vi.fn() })
);

describe("EquipmentBoardRealtime", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows nothing while live updates are connected", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(false);
    render(<EquipmentBoardRealtime />);

    expect(
      createEquipmentBoardRealtimePage().queryNotice()
    ).not.toBeInTheDocument();
  });

  it("warns that the board may be stale when live updates are down", () => {
    vi.mocked(useRealtimeRefresh).mockReturnValue(true);
    render(<EquipmentBoardRealtime />);
    const notice =
      createEquipmentBoardRealtimePage().getNotice();

    expect(
      within(notice).getByText(
        EQUIPMENT_BOARD_COPY.LIVE_UPDATES_LOST_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(notice).getByText(
        EQUIPMENT_BOARD_COPY.LIVE_UPDATES_LOST_BODY
      )
    ).toBeInTheDocument();
  });
});

import { BOARD_UNIT_FILTER } from "@/app/constants";
import { isValidElement } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import { getBoardPendingDispatch } from "@/app/services/operations/getBoardPendingDispatch";
import { getBoardEquipmentPending } from "@/app/services/equipment/getBoardEquipmentPending";
import EquipmentBoard from "../EquipmentBoard";
import EquipmentBoardEntry from "../EquipmentBoardEntry";
import { WORK_MODE_REDIRECT_MESSAGE } from "./EquipmentBoardEntry.constants";

vi.mock(
  "@/app/services/work-mode/ensureWorkModeChosen",
  () => ({
    ensureWorkModeChosen: vi.fn(),
  })
);

vi.mock(
  "@/app/services/operations/getBoardPendingDispatch",
  () => ({
    getBoardPendingDispatch: vi.fn(),
  })
);

vi.mock(
  "@/app/services/equipment/getBoardEquipmentPending",
  () => ({
    getBoardEquipmentPending: vi.fn(),
  })
);

vi.mock("../EquipmentBoard", () => ({
  default: vi.fn(),
}));

describe("EquipmentBoardEntry", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the board after the work-mode guard passes", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();
    vi.mocked(getBoardPendingDispatch).mockResolvedValue({
      count: 4,
      isVisible: true,
    });
    vi.mocked(getBoardEquipmentPending).mockResolvedValue(
      2
    );

    const entry = await EquipmentBoardEntry();

    expect(ensureWorkModeChosen).toHaveBeenCalledTimes(1);
    expect(isValidElement(entry)).toBe(true);
    expect(entry.type).toBe(EquipmentBoard);
    expect(entry.props).toEqual({
      filter: BOARD_UNIT_FILTER.ALL,
      pendingDispatch: { count: 4, isVisible: true },
      equipmentPending: 2,
    });
  });

  it("does not read the equipment reports outside operations", async () => {
    vi.mocked(getBoardPendingDispatch).mockResolvedValue({
      count: null,
      isVisible: false,
    });

    await EquipmentBoardEntry();

    expect(getBoardEquipmentPending).not.toHaveBeenCalled();
  });

  it("does not render the board when the work-mode guard redirects", async () => {
    vi.mocked(ensureWorkModeChosen).mockRejectedValue(
      new Error(WORK_MODE_REDIRECT_MESSAGE)
    );

    await expect(EquipmentBoardEntry()).rejects.toThrow(
      WORK_MODE_REDIRECT_MESSAGE
    );
    expect(EquipmentBoard).not.toHaveBeenCalled();
  });
});

import { isValidElement } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ensureWorkModeChosen } from "@/app/features/access/work-mode/ensureWorkModeChosen";
import EquipmentBoard from "@/app/features/board/equipment-board/EquipmentBoard";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";
import EquipmentBoardPage, { metadata } from "../page";
import { MODE_REDIRECT_MESSAGE } from "./EquipmentBoardPage.constants";

vi.mock(
  "@/app/features/access/work-mode/ensureWorkModeChosen",
  () => ({
    ensureWorkModeChosen: vi.fn(),
  })
);

vi.mock(
  "@/app/features/board/equipment-board/EquipmentBoard",
  () => ({
    default: vi.fn(),
  })
);

describe("EquipmentBoardPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("exports the board metadata", () => {
    expect(metadata).toBe(EQUIPMENT_BOARD_METADATA);
  });

  it("returns the board once the work mode check passes", async () => {
    vi.mocked(ensureWorkModeChosen).mockResolvedValue();

    const page = await EquipmentBoardPage();

    expect(ensureWorkModeChosen).toHaveBeenCalledTimes(1);
    expect(isValidElement(page)).toBe(true);
    expect(page.type).toBe(EquipmentBoard);
  });

  it("rejects before any board is built when the check redirects", async () => {
    vi.mocked(ensureWorkModeChosen).mockRejectedValue(
      new Error(MODE_REDIRECT_MESSAGE)
    );

    await expect(EquipmentBoardPage()).rejects.toThrow(
      MODE_REDIRECT_MESSAGE
    );
    expect(EquipmentBoard).not.toHaveBeenCalled();
  });
});

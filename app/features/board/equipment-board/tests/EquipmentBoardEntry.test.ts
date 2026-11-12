import { isValidElement } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { ensureWorkModeChosen } from "@/app/services/work-mode/ensureWorkModeChosen";
import EquipmentBoard from "../EquipmentBoard";
import EquipmentBoardEntry from "../EquipmentBoardEntry";
import { WORK_MODE_REDIRECT_MESSAGE } from "./EquipmentBoardEntry.constants";

vi.mock(
  "@/app/services/work-mode/ensureWorkModeChosen",
  () => ({
    ensureWorkModeChosen: vi.fn(),
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

    const entry = await EquipmentBoardEntry();

    expect(ensureWorkModeChosen).toHaveBeenCalledTimes(1);
    expect(isValidElement(entry)).toBe(true);
    expect(entry.type).toBe(EquipmentBoard);
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

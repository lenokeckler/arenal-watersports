import { isValidElement } from "react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import EquipmentBoardEntry from "@/app/features/board/equipment-board/EquipmentBoardEntry";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";
import EquipmentBoardPage, { metadata } from "../page";

vi.mock(
  "@/app/features/board/equipment-board/EquipmentBoardEntry",
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

  it("renders the shared guarded board entry", () => {
    const page = EquipmentBoardPage();

    expect(isValidElement(page)).toBe(true);
    expect(page.type).toBe(EquipmentBoardEntry);
  });
});

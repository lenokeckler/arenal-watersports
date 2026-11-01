import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EQUIPMENT_BOARD_METADATA } from "@/app/features/board/equipment-board/constants/EquipmentBoardMetadata.constants";
import EquipmentBoardPage, { metadata } from "../page";
import {
  BOARD_STUB_TEST_ID,
  GATE_STUB_TEST_ID,
} from "./EquipmentBoardPage.constants";

vi.mock(
  "@/app/features/access/work-mode/WorkModeGate",
  () => ({
    default: () => <div data-testid={GATE_STUB_TEST_ID} />,
  })
);

vi.mock(
  "@/app/features/board/equipment-board/EquipmentBoard",
  () => ({
    default: () => <div data-testid={BOARD_STUB_TEST_ID} />,
  })
);

describe("EquipmentBoardPage", () => {
  it("exports the board metadata", () => {
    expect(metadata).toBe(EQUIPMENT_BOARD_METADATA);
  });

  it("renders the work mode gate before the board", () => {
    render(<EquipmentBoardPage />);

    const gate = screen.getByTestId(GATE_STUB_TEST_ID);
    const board = screen.getByTestId(BOARD_STUB_TEST_ID);

    expect(
      gate.compareDocumentPosition(board) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import { EQUIPMENT_BOARD_COPY } from "@/app/features/board/equipment-board/constants/EquipmentBoardCopy.constants";
import EquipmentBoardRouteError from "../error";

describe("EquipmentBoardRouteError", () => {
  it("shows the board failure alert", () => {
    render(<EquipmentBoardRouteError reset={vi.fn()} />);

    expect(
      screen.getByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(EQUIPMENT_BOARD_COPY.ERROR_TITLE);
  });

  it("passes reset through to the retry button", async () => {
    const reset = vi.fn();
    render(<EquipmentBoardRouteError reset={reset} />);

    await userEvent.setup().click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: EQUIPMENT_BOARD_COPY.RETRY,
      })
    );

    expect(reset).toHaveBeenCalledTimes(1);
  });
});

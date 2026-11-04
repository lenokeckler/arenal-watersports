import { describe, expect, it, vi } from "vitest";
import { render, within } from "@testing-library/react";
import EquipmentBoardError from "../components/EquipmentBoardError";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { HEADING_LEVEL_ONE } from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

describe("EquipmentBoardError", () => {
  it("announces the failure with its title and body", () => {
    render(<EquipmentBoardError reset={vi.fn()} />);
    const alert = createEquipmentBoardPage().getAlert();

    expect(
      within(alert).getByText(
        EQUIPMENT_BOARD_COPY.ERROR_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(alert).getByText(
        EQUIPMENT_BOARD_COPY.ERROR_BODY
      )
    ).toBeInTheDocument();
  });

  it("calls reset once when the worker retries", async () => {
    const reset = vi.fn();
    render(<EquipmentBoardError reset={reset} />);

    await createEquipmentBoardPage().retry();

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("keeps the page title and never reads as an empty board", () => {
    render(<EquipmentBoardError reset={vi.fn()} />);
    const page = createEquipmentBoardPage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryGrid()).toBeNull();
    expect(
      page.queryText(EQUIPMENT_BOARD_COPY.EMPTY_TITLE)
    ).toBeNull();
  });
});

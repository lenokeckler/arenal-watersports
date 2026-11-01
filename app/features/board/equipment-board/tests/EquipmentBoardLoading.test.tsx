import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardLoading from "../components/EquipmentBoardLoading";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_TRUE,
  HEADING_LEVEL_ONE,
  HEADING_LEVEL_TWO,
} from "./EquipmentBoard.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

describe("EquipmentBoardLoading", () => {
  it("marks the page busy and announces the load to screen readers", () => {
    render(<EquipmentBoardLoading />);
    const page = createEquipmentBoardPage();

    expect(
      page.getMain().getAttribute(ARIA_BUSY_ATTRIBUTE)
    ).toBe(ARIA_BUSY_TRUE);
    expect(page.getStatus()).toHaveTextContent(
      EQUIPMENT_BOARD_COPY.LOADING_ANNOUNCEMENT
    );
  });

  it("keeps the page title and shows no category or figure while loading", () => {
    render(<EquipmentBoardLoading />);
    const page = createEquipmentBoardPage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(
      page.queryHeadings(HEADING_LEVEL_TWO)
    ).toHaveLength(0);
    expect(page.queryGrid()).toBeNull();
  });
});

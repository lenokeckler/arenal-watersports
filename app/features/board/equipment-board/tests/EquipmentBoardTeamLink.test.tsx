import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import EquipmentBoardHeader from "../components/EquipmentBoardHeader";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";

describe("Equipment button of the board", () => {
  afterEach(cleanup);

  it("opens the equipment screen and says how many reports are left", () => {
    render(
      <EquipmentBoardHeader
        equipmentPending={2}
        showEquipment
      />
    );

    const link = screen.getByRole(ARIA_ROLE.LINK, {
      name: EQUIPMENT_BOARD_COPY.TEAM_LABEL(2),
    });

    expect(link).toHaveAttribute(
      "href",
      PATHS.OPERATIONS.EQUIPMENT
    );
    expect(link).toHaveTextContent("2");
  });

  it("shows no number when nothing is left", () => {
    render(
      <EquipmentBoardHeader
        equipmentPending={0}
        showEquipment
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: EQUIPMENT_BOARD_COPY.TEAM_TITLE,
      })
    ).not.toHaveTextContent("0");
  });

  it("is hidden outside operations and keeps the board title", () => {
    render(<EquipmentBoardHeader />);

    expect(
      screen.queryByRole(ARIA_ROLE.LINK)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.HEADING, {
        name: EQUIPMENT_BOARD_COPY.PAGE_TITLE,
      })
    ).toBeInTheDocument();
  });
});

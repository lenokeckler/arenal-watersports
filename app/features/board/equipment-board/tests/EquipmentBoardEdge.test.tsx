import { BOARD_UNIT_FILTER } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import {
  CARDS_WITH_LONG_NAME,
  EDGE_CATEGORY_NAME,
} from "./EquipmentBoardEdge.constants";
import { createEquipmentBoardPage } from "./EquipmentBoard.page";

describe("EquipmentBoardContent edge cases", () => {
  it("renders a very long category name whole in its card heading", () => {
    render(
      <EquipmentBoardContent
        cards={CARDS_WITH_LONG_NAME}
        filter={BOARD_UNIT_FILTER.ALL}
      />
    );
    const page = createEquipmentBoardPage();

    expect(
      page.getCard(EDGE_CATEGORY_NAME.LONG)
    ).toBeInTheDocument();
  });
});

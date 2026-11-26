import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BOARD_UNIT_FILTER } from "@/app/constants";
import EquipmentBoardContent from "../components/EquipmentBoardContent";
import type { BoardCard } from "../models/BoardCard.interface";
import { buildBoardCards } from "../utils/buildBoardCards";
import { createBoardCategory } from "./createBoardCategory";

const createCards = (): BoardCard[] =>
  buildBoardCards([
    createBoardCategory({
      damagedCount: 0,
      freeCount: 3,
      id: "jet",
      maintenanceCount: 2,
      name: "Jet Ski",
      totalCount: 6,
    }),
    createBoardCategory({
      damagedCount: 0,
      freeCount: 4,
      id: "kayak",
      maintenanceCount: 0,
      name: "Kayak",
      totalCount: 4,
    }),
  ]);

describe("EquipmentBoardContent with a status filter", () => {
  it("shows how many units match the filter and links with it", () => {
    render(
      <EquipmentBoardContent
        cards={createCards()}
        filter={BOARD_UNIT_FILTER.MAINTENANCE}
      />
    );

    expect(
      screen.getByText("2 en mantenimiento")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Jet Ski" })
    ).toHaveAttribute(
      "href",
      "/board/categories/jet?status=maintenance"
    );
  });

  it("dims and unlinks a category with no unit in that status", () => {
    render(
      <EquipmentBoardContent
        cards={createCards()}
        filter={BOARD_UNIT_FILTER.MAINTENANCE}
      />
    );

    expect(
      screen.queryByRole("link", { name: "Kayak" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("0 en mantenimiento")
    ).toBeInTheDocument();
  });

  it("keeps the free of total text and plain links with no filter", () => {
    render(
      <EquipmentBoardContent
        cards={createCards()}
        filter={BOARD_UNIT_FILTER.ALL}
      />
    );

    expect(
      screen.getByRole("link", { name: "Kayak" })
    ).toHaveAttribute("href", "/board/categories/kayak");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BOARD_UNIT_FILTER } from "@/app/constants";
import BoardUnitFilter from "@/app/components/board-unit-filter/BoardUnitFilter";
import CategoryGroupSwitch from "../components/CategoryGroupSwitch";
import {
  GROUP_DOUBLE,
  GROUP_MEMBERS,
} from "./CategoryGroupSwitch.constants";

describe("Category units filter", () => {
  it("lists the four filters with their counts and marks the current one", () => {
    render(
      <BoardUnitFilter
        basePath="/board/categories/jet"
        counts={{
          available: 3,
          damaged: 1,
          maintenance: 2,
          total: 7,
        }}
        current={BOARD_UNIT_FILTER.MAINTENANCE}
      />
    );

    expect(
      screen.getByRole("link", {
        hidden: true,
        name: /En mantenimiento/,
      })
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", {
        hidden: true,
        name: /Disponibles/,
      })
    ).toHaveAttribute(
      "href",
      "/board/categories/jet?status=available"
    );
    expect(
      screen.getByRole("link", {
        hidden: true,
        name: /Todas/,
      })
    ).toHaveAttribute("href", "/board/categories/jet");
    expect(
      screen.getByRole("link", {
        hidden: true,
        name: /Dañadas/,
      })
    ).toHaveTextContent("1");
  });

  it("keeps the filter when switching to another category of the group", () => {
    render(
      <CategoryGroupSwitch
        currentCategoryId={GROUP_DOUBLE.id}
        filter={BOARD_UNIT_FILTER.DAMAGED}
        members={GROUP_MEMBERS}
      />
    );

    screen
      .getAllByRole("link", { hidden: true })
      .forEach((link) => {
        expect(link.getAttribute("href")).toContain(
          "?status=damaged"
        );
      });
  });
});

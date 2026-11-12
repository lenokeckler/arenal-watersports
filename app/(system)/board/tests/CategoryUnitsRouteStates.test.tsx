import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "@/app/features/board/category-units/constants/CategoryUnitsCopy.constants";
import CategoryUnitsRouteError from "../categories/[categoryId]/error";
import CategoryUnitsRouteLoading from "../categories/[categoryId]/loading";
import CategoryUnitsRouteNotFound from "../categories/[categoryId]/not-found";

describe("category units route states", () => {
  it("shows the loading announcement", () => {
    render(<CategoryUnitsRouteLoading />);

    expect(
      screen.getByRole(ARIA_ROLE.STATUS)
    ).toHaveTextContent(
      CATEGORY_UNITS_COPY.LOADING_ANNOUNCEMENT
    );
  });

  it("shows the failure alert", () => {
    render(<CategoryUnitsRouteError reset={vi.fn()} />);

    expect(
      screen.getByRole(ARIA_ROLE.ALERT)
    ).toHaveTextContent(CATEGORY_UNITS_COPY.ERROR_TITLE);
  });

  it("passes reset through to the retry button", async () => {
    const reset = vi.fn();
    render(<CategoryUnitsRouteError reset={reset} />);

    await userEvent.setup().click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_UNITS_COPY.RETRY,
      })
    );

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("shows the Spanish not found message with a link to the board", () => {
    render(<CategoryUnitsRouteNotFound />);

    expect(
      screen.getByText(CATEGORY_UNITS_COPY.NOT_FOUND_TITLE)
    ).toBeInTheDocument();
    expect(
      screen.getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_UNITS_COPY.BACK_TO_BOARD,
      })
    ).toHaveAttribute("href", PATHS.BOARD);
  });
});

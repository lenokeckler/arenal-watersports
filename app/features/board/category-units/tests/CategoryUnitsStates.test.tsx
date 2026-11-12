import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PATHS } from "@/app/constants";
import CategoryUnitsEmpty from "../components/CategoryUnitsEmpty";
import CategoryUnitsError from "../components/CategoryUnitsError";
import CategoryUnitsLoading from "../components/CategoryUnitsLoading";
import CategoryUnitsNotFound from "../components/CategoryUnitsNotFound";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { createCategoryUnitsScreenPage } from "./CategoryUnitsScreen.page";

describe("CategoryUnits states", () => {
  it("announces the loading state and keeps the way back to the board", () => {
    render(<CategoryUnitsLoading />);
    const page = createCategoryUnitsScreenPage();

    expect(page.getMain()).toHaveAttribute(
      "aria-busy",
      "true"
    );
    expect(page.getStatus()).toHaveTextContent(
      CATEGORY_UNITS_COPY.LOADING_ANNOUNCEMENT
    );
    expect(page.getBackLink()).toHaveAttribute(
      "href",
      PATHS.BOARD
    );
  });

  it("shows the failure as an alert that warns not to assume free units", () => {
    render(<CategoryUnitsError reset={vi.fn()} />);
    const page = createCategoryUnitsScreenPage();

    expect(page.getAlert()).toHaveTextContent(
      CATEGORY_UNITS_COPY.ERROR_TITLE
    );
    expect(page.getAlert()).toHaveTextContent(
      CATEGORY_UNITS_COPY.ERROR_BODY
    );
    expect(page.getBackLink()).toBeInTheDocument();
  });

  it("calls reset from the retry button", async () => {
    const reset = vi.fn();
    render(<CategoryUnitsError reset={reset} />);

    await createCategoryUnitsScreenPage().retry();

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("explains that the category is not on the board and links back", () => {
    render(<CategoryUnitsNotFound />);
    const page = createCategoryUnitsScreenPage();

    expect(
      page.getPageText(CATEGORY_UNITS_COPY.NOT_FOUND_TITLE)
    ).toBeInTheDocument();
    expect(
      page.getPageText(CATEGORY_UNITS_COPY.NOT_FOUND_BODY)
    ).toBeInTheDocument();
    expect(page.getBackLink()).toHaveAttribute(
      "href",
      PATHS.BOARD
    );
  });

  it("shows the empty state copy", () => {
    render(<CategoryUnitsEmpty />);
    const page = createCategoryUnitsScreenPage();

    expect(
      page.getPageText(CATEGORY_UNITS_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(
      page.getPageText(CATEGORY_UNITS_COPY.EMPTY_BODY)
    ).toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import IncomeLoading from "../components/IncomeLoading";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import { createIncomePage } from "./Income.page";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_TRUE,
  HEADING_LEVEL_ONE,
} from "./IncomeScreen.constants";

describe("IncomeLoading", () => {
  it("marks the page busy and announces the load to screen readers", () => {
    render(<IncomeLoading />);
    const page = createIncomePage();

    expect(page.getMain()).toHaveAttribute(
      ARIA_BUSY_ATTRIBUTE,
      ARIA_BUSY_TRUE
    );
    expect(page.getStatus()).toHaveTextContent(
      INCOME_COPY.LOADING_ANNOUNCEMENT
    );
  });

  it("keeps the page title and shows no figures while loading", () => {
    render(<IncomeLoading />);
    const page = createIncomePage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryRegions()).toHaveLength(0);
    expect(page.queryDefinitions()).toHaveLength(0);
  });
});

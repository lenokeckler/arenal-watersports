import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { createCategoryCardPage } from "./CategoryCard.page";
import {
  DEFAULT_CATEGORY_CARD_PANEL_ID,
  DEFAULT_CATEGORY_CARD_VIEW_MODEL,
} from "./CategoryCardViewModel.constants";

const CLOSED_CATEGORY_CARD = {
  ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
  isPanelOpen: false,
};

describe("CategoryCard options panel", () => {
  it("shows one Editar button and no option while it is closed", () => {
    render(<CategoryCard {...CLOSED_CATEGORY_CARD} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getEditButton()
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      categoryCardPage.getBehaviorLink()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getDepositLink()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getAlertsLink()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getUnitsLink()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
  });

  it("points Editar at the panel and marks it expanded while it is open", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getEditButton()
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      categoryCardPage.getEditButton()
    ).toHaveAttribute(
      "aria-controls",
      DEFAULT_CATEGORY_CARD_PANEL_ID
    );
  });

  it("shows the options and the state action when it is open", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getBehaviorLink()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getDepositLink()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getAlertsLink()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getUnitsLink()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).toBeInTheDocument();
  });

  it("calls onTogglePanelClick when Editar is pressed", async () => {
    const onTogglePanelClick = vi.fn();
    render(
      <CategoryCard
        {...CLOSED_CATEGORY_CARD}
        onTogglePanelClick={onTogglePanelClick}
      />
    );

    await createCategoryCardPage().clickEditButton();

    expect(onTogglePanelClick).toHaveBeenCalledOnce();
  });
});

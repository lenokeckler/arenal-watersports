import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import CategoryListBody from "../components/CategoryListBody";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";
import { createCategoryListBodyPage } from "./CategoryListBody.page";

describe("CategoryListBody", () => {
  it("renders the fetch-error state and hides the card list when the view state is ERROR", () => {
    render(
      <CategoryListBody
        cards={[DEFAULT_CATEGORY_CARD_VIEW_MODEL]}
        onRetry={vi.fn()}
        viewState={CATEGORY_LIST_VIEW_STATE.ERROR}
      />
    );
    const categoryListBodyPage =
      createCategoryListBodyPage();

    expect(
      categoryListBodyPage.getErrorMessage()
    ).toBeInTheDocument();
    expect(
      categoryListBodyPage.getRetryButton()
    ).toBeInTheDocument();
    expect(
      categoryListBodyPage.getCategoryHeading(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.name
      )
    ).not.toBeInTheDocument();
  });

  it("renders the empty state and hides the card list when the view state is EMPTY", () => {
    render(
      <CategoryListBody
        cards={[DEFAULT_CATEGORY_CARD_VIEW_MODEL]}
        onRetry={vi.fn()}
        viewState={CATEGORY_LIST_VIEW_STATE.EMPTY}
      />
    );
    const categoryListBodyPage =
      createCategoryListBodyPage();

    expect(
      categoryListBodyPage.getEmptyStateTitle()
    ).toBeInTheDocument();
    expect(
      categoryListBodyPage.getCategoryHeading(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.name
      )
    ).not.toBeInTheDocument();
  });

  it("renders the card list and hides the empty/error copy when the view state is READY", () => {
    render(
      <CategoryListBody
        cards={[DEFAULT_CATEGORY_CARD_VIEW_MODEL]}
        onRetry={vi.fn()}
        viewState={CATEGORY_LIST_VIEW_STATE.READY}
      />
    );
    const categoryListBodyPage =
      createCategoryListBodyPage();

    expect(
      categoryListBodyPage.getCategoryHeading(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.name
      )
    ).toBeInTheDocument();
    expect(
      categoryListBodyPage.getErrorMessage()
    ).not.toBeInTheDocument();
    expect(
      categoryListBodyPage.getEmptyStateTitle()
    ).not.toBeInTheDocument();
  });

  it("calls onRetry when the retry button is clicked in the error state", async () => {
    const onRetry = vi.fn();
    render(
      <CategoryListBody
        cards={[]}
        onRetry={onRetry}
        viewState={CATEGORY_LIST_VIEW_STATE.ERROR}
      />
    );
    const categoryListBodyPage =
      createCategoryListBodyPage();

    await categoryListBodyPage.clickRetry();

    expect(onRetry).toHaveBeenCalledOnce();
  });
});

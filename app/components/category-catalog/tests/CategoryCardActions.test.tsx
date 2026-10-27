import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import CategoryCard from "../components/CategoryCard";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";
import { createCategoryCardPage } from "./CategoryCard.page";

describe("CategoryCard actions", () => {
  it("renders the delete button and hides the mark-inactive button when the action state is DELETE", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={CATEGORY_CARD_ACTION_STATE.DELETE}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getDeleteButton()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
  });

  it("renders the mark-inactive button and hides the delete button when the action state is MARK_INACTIVE", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE
        }
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getMarkInactiveButton()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
  });

  it("renders neither action button when the action state is NONE", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={CATEGORY_CARD_ACTION_STATE.NONE}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
  });
});

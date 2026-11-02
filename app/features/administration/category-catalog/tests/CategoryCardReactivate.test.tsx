import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { createCategoryCardPage } from "./CategoryCard.page";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";

describe("CategoryCard reactivate action", () => {
  it("renders only the reactivate button when the action state is REACTIVATE", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        isInactive
        actionState={CATEGORY_CARD_ACTION_STATE.REACTIVATE}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getReactivateButton()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
  });

  it("hides the reactivate button for any other action state", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE
        }
      />
    );

    expect(
      createCategoryCardPage().getReactivateButton()
    ).not.toBeInTheDocument();
  });

  it("calls onReactivateClick when the reactivate button is clicked", async () => {
    const onReactivateClick = vi.fn();
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        isInactive
        actionState={CATEGORY_CARD_ACTION_STATE.REACTIVATE}
        onReactivateClick={onReactivateClick}
      />
    );

    await createCategoryCardPage().clickReactivateButton();

    expect(onReactivateClick).toHaveBeenCalledOnce();
  });
});

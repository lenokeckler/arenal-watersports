import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { resolveCategoryBehaviorPath } from "../utils/resolveCategoryBehaviorPath";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import CategoryCard from "../components/CategoryCard";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";
import { createCategoryCardPage } from "./CategoryCard.page";

describe("CategoryCard", () => {
  it("renders the category name as a heading", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getNameHeading(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.name
      )
    ).toBeInTheDocument();
  });

  it("links to the behavior form of the category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getBehaviorLink()
    ).toHaveAttribute(
      "href",
      resolveCategoryBehaviorPath(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.id
      )
    );
  });

  it("keeps the behavior link for an inactive category", () => {
    const viewModel = {
      ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
      actionState: CATEGORY_CARD_ACTION_STATE.NONE,
      category: {
        ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
        status: CATEGORY_STATUS.INACTIVE,
      },
    };
    render(<CategoryCard {...viewModel} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getBehaviorLink()
    ).toBeInTheDocument();
  });

  it("omits the group row when the category has no group", () => {
    const viewModel = {
      ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
      category: {
        ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
        groupName: null,
      },
    };
    render(<CategoryCard {...viewModel} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getGroupRow("Kayaks")
    ).not.toBeInTheDocument();
  });

  it("renders the group row when the category has a group", () => {
    const viewModel = {
      ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
      category: {
        ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
        groupName: "Kayaks",
      },
    };
    render(<CategoryCard {...viewModel} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getGroupRow("Kayaks")
    ).toBeInTheDocument();
  });

  it("shows the inactive pill and hides every action for an inactive category", () => {
    const viewModel = {
      ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
      actionState: CATEGORY_CARD_ACTION_STATE.NONE,
      category: {
        ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
        status: CATEGORY_STATUS.INACTIVE,
      },
    };
    render(<CategoryCard {...viewModel} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getInactivePill()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
  });

  it("hides the inactive pill for an active category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getInactivePill()
    ).not.toBeInTheDocument();
  });

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

  it("renders the confirm message and both confirm buttons when the action state is CONFIRM_DELETE", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
        }
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getConfirmDeleteMessage()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getCancelButton()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getConfirmDeleteButton()
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
  });

  it("calls onCancelClick when the confirm row's Cancelar button is clicked", async () => {
    const onCancelClick = vi.fn();
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
        }
        onCancelClick={onCancelClick}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    await categoryCardPage.clickCancelButton();

    expect(onCancelClick).toHaveBeenCalledOnce();
  });

  it("calls onConfirmDeleteClick when the confirm row's Eliminar button is clicked", async () => {
    const onConfirmDeleteClick = vi.fn();
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
        }
        onConfirmDeleteClick={onConfirmDeleteClick}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    await categoryCardPage.clickConfirmDeleteButton();

    expect(onConfirmDeleteClick).toHaveBeenCalledOnce();
  });

  it("disables the confirm row's Cancelar button while the deletion is in flight, so cancelling cannot desync from a delete that still completes", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        actionState={
          CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
        }
        isActionLoading
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.isCancelButtonDisabled()).toBe(
      true
    );
  });
});

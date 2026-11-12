import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { resolveCategoryBehaviorPath } from "../utils/resolveCategoryBehaviorPath";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
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

  it("renders the subtitle it receives", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getSubtitle(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.subtitle
      )
    ).toBeInTheDocument();
  });

  it("renders the group prefix label with the group name", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getGroupPrefix()
    ).toBeInTheDocument();
  });

  it("shows the inactive chip and hides every action for an inactive category", () => {
    const viewModel = {
      ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
      actionState: CATEGORY_CARD_ACTION_STATE.NONE,
      isInactive: true,
      category: {
        ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
        status: CATEGORY_STATUS.INACTIVE,
      },
    };
    render(<CategoryCard {...viewModel} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getStatusChip(
        CATEGORY_CATALOG_COPY.STATUS_LABEL_INACTIVE
      )
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getStatusChip(
        CATEGORY_CATALOG_COPY.STATUS_LABEL_ACTIVE
      )
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
  });

  it("shows the active chip for an active category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getStatusChip(
        CATEGORY_CATALOG_COPY.STATUS_LABEL_ACTIVE
      )
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getStatusChip(
        CATEGORY_CATALOG_COPY.STATUS_LABEL_INACTIVE
      )
    ).not.toBeInTheDocument();
  });
});

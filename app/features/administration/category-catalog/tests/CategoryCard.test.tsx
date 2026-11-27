import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { resolveCategoryConfigurePath } from "../utils/resolveCategoryConfigurePath";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";
import { createCategoryCardPage } from "./CategoryCard.page";

const { category } = DEFAULT_CATEGORY_CARD_VIEW_MODEL;

const INACTIVE_CATEGORY_CARD = {
  ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
  isInactive: true,
  category: {
    ...category,
    status: CATEGORY_STATUS.INACTIVE,
  },
};

describe("CategoryCard", () => {
  it("is one link to the Configurar screen of the category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getCardLink()).toHaveAttribute(
      "href",
      resolveCategoryConfigurePath(category.id)
    );
  });

  it("names the link after the category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getCardLink()
    ).toHaveAccessibleName(new RegExp(category.name));
  });

  it("shows the Editar label as text inside the link", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getCardLink()
    ).toHaveTextContent(CATEGORY_CATALOG_COPY.EDIT_BUTTON);
  });

  it("renders no button, so nothing interactive sits inside the link", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getButtons()).toHaveLength(0);
  });

  it("renders neither the options panel nor the status actions", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getBehaviorLink()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getMarkInactiveButton()
    ).not.toBeInTheDocument();
    expect(
      categoryCardPage.getDeleteButton()
    ).not.toBeInTheDocument();
  });

  it("renders the name, the subtitle and the group of the category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getNameHeading(category.name)
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getSubtitle(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.subtitle
      )
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getGroupPrefix()
    ).toBeInTheDocument();
  });

  it("omits the group row when the category has no group", () => {
    render(
      <CategoryCard
        {...DEFAULT_CATEGORY_CARD_VIEW_MODEL}
        category={{ ...category, groupName: null }}
      />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getGroupPrefix()
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

  it("shows the inactive chip, and no Reactivar button, for an inactive category", () => {
    render(<CategoryCard {...INACTIVE_CATEGORY_CARD} />);
    const categoryCardPage = createCategoryCardPage();

    expect(
      categoryCardPage.getStatusChip(
        CATEGORY_CATALOG_COPY.STATUS_LABEL_INACTIVE
      )
    ).toBeInTheDocument();
    expect(
      categoryCardPage.getReactivateButton()
    ).not.toBeInTheDocument();
  });
});

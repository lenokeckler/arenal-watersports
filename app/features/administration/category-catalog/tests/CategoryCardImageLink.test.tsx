import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { resolveCategoryImagePath } from "../utils/resolveCategoryImagePath";
import { createCategoryCardPage } from "./CategoryCard.page";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";

describe("CategoryCard image link", () => {
  it("links the card to the image screen of its category", () => {
    render(
      <CategoryCard {...DEFAULT_CATEGORY_CARD_VIEW_MODEL} />
    );
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getImageLink()).toHaveAttribute(
      "href",
      resolveCategoryImagePath(
        DEFAULT_CATEGORY_CARD_VIEW_MODEL.category.id
      )
    );
  });
});

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";
import { createCategoryCardPage } from "./CategoryCard.page";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";

const buildCategoryCard = (
  overrides: Partial<CategoryListItem>,
  isInactive: boolean
): CategoryCardViewModel => ({
  ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
  actionState: CATEGORY_CARD_ACTION_STATE.NONE,
  isInactive,
  category: {
    ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
    ...overrides,
  },
});

const BY_QUANTITY_CARDS = [
  buildCategoryCard(
    { trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY },
    false
  ),
  buildCategoryCard(
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      status: CATEGORY_STATUS.INACTIVE,
    },
    true
  ),
];

const BY_UNIT_CARD = buildCategoryCard(
  { trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT },
  false
);

describe("CategoryCard stock link", () => {
  it.each(BY_QUANTITY_CARDS)(
    "links an active and an inactive by-quantity card to the stock count of its category",
    (viewModel) => {
      render(<CategoryCard {...viewModel} />);
      const categoryCardPage = createCategoryCardPage();

      expect(
        categoryCardPage.getStockLink()
      ).toHaveAttribute(
        "href",
        resolveCategoryStockPath(viewModel.category.id)
      );
    }
  );

  it("hides the link on a by-unit card", () => {
    render(<CategoryCard {...BY_UNIT_CARD} />);
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getStockLink()).toBeNull();
  });
});

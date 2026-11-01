import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import { resolveCategoryUnitsPath } from "../utils/resolveCategoryUnitsPath";
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

const BY_UNIT_CARDS = [
  buildCategoryCard(
    { trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT },
    false
  ),
  buildCategoryCard(
    {
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      status: CATEGORY_STATUS.INACTIVE,
    },
    true
  ),
];

const BY_QUANTITY_CARD = buildCategoryCard(
  { trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY },
  false
);

describe("CategoryCard units link", () => {
  it.each(BY_UNIT_CARDS)(
    "links an active and an inactive by-unit card to the units of its category",
    (viewModel) => {
      render(<CategoryCard {...viewModel} />);
      const categoryCardPage = createCategoryCardPage();

      expect(
        categoryCardPage.getUnitsLink()
      ).toHaveAttribute(
        "href",
        resolveCategoryUnitsPath(viewModel.category.id)
      );
    }
  );

  it("hides the link on a by-quantity card", () => {
    render(<CategoryCard {...BY_QUANTITY_CARD} />);
    const categoryCardPage = createCategoryCardPage();

    expect(categoryCardPage.getUnitsLink()).toBeNull();
  });
});

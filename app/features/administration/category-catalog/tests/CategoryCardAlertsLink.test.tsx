import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryCard from "../components/CategoryCard";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { resolveCategoryAlertsPath } from "../utils/resolveCategoryAlertsPath";
import { createCategoryCardPage } from "./CategoryCard.page";
import { DEFAULT_CATEGORY_CARD_VIEW_MODEL } from "./CategoryCardViewModel.constants";

const INACTIVE_CATEGORY_CARD: CategoryCardViewModel = {
  ...DEFAULT_CATEGORY_CARD_VIEW_MODEL,
  actionState: CATEGORY_CARD_ACTION_STATE.NONE,
  isInactive: true,
  category: {
    ...DEFAULT_CATEGORY_CARD_VIEW_MODEL.category,
    status: CATEGORY_STATUS.INACTIVE,
  },
};

describe("CategoryCard alerts link", () => {
  it.each([
    DEFAULT_CATEGORY_CARD_VIEW_MODEL,
    INACTIVE_CATEGORY_CARD,
  ])(
    "links every card to the alerts screen of its category",
    (viewModel) => {
      render(<CategoryCard {...viewModel} />);
      const categoryCardPage = createCategoryCardPage();

      expect(
        categoryCardPage.getAlertsLink()
      ).toHaveAttribute(
        "href",
        resolveCategoryAlertsPath(viewModel.category.id)
      );
    }
  );
});
